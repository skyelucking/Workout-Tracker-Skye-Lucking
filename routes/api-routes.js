const Workout = require("../models/workout.js");
const mongoose = require("mongoose");
const router = require("express").Router();

// Route to post form submission to mongoDB via mongoose
router.post("/api/workout", ({ body }, res) => {
    Workout.create({}).then((data) => {
        // If saved successfully, send the the new Workout document to the client
        res.json(data);
    }).catch((err) => {
        res.status(500).send('Internal Server Error');
    });
});

router.put("/api/workout/:id", ({ params, body }, res) => {
    console.log("params", body, params);
    // Finding Workout by Id and updating it 
    Workout.findByIdAndUpdate(
        params.id,
        { $push: { exercises: body } },
        { new: true }
    ).then((data) => {
        res.json(data);
    }).catch((err) => {
        // If an error occurs, send the error to the client
        res.status(500).send('Internal Server Error');
    });
});

// Aggregate function to dynamically add up and return duration for each workout
router.get("/api/workout/range", async function (req, res) {
    try {
        res.json((
            await Workout.aggregate([
                {
                    $addFields: {
                        totalDuration: {
                            $sum: '$exercises.duration',
                        },
                    },
                },
                // Returning the 7 most recent documents (subtracts the oldest document [day] with -1)
            ]).sort({ day: -1 })
                // Limiting number of documents returned in the output to 7
                .limit(7)
            // Shows workouts in order of most recent (right to left)
        ).reverse());
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
});

router.get("/api/workout", (req, res) => {
    Workout.find({}).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.status(500).send('Internal Server Error');
    });
});

module.exports = router;
const router = require("express").Router();
const { Workout } = require("../models");

router.get("/api/workouts", (req, res) => {
    Workout.find()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(404).json(err))
});

router.get("/api/workouts/range", (req, res) => {
    Workout.find()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(404).json(err))
});

router.post("/api/workouts", (req, res) => {
    Workout.create(req.body)
        .then(data => res.status(201).json(data))
        .catch(err => res.status(422).json(err))
});

router.put("/api/workouts/:id", (req, res) => {
    Workout.findByIdAndUpdate(req.params.id, { $push: {exercises: req.body} }, { new: true })
        .then(data => res.status(200).json(data))
        .catch(err => res.status(422).json(err))
});

module.exports = router;
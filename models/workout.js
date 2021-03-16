const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema ({
    day: {
        type: Date,
        default: Date.now
    },
    exercises : [
        {
            type: {
                type: String,
                trim: true,
                required: "Please enter an exercise type"
            },
            name: {
                type: String,
                trim: true,
                required: "Please enter an exercise name"
            },
            duration: {
                type: Number,
                required: "Please enter an exercise duration"
            },
            weight: {
                type: Number
            },
            reps: {
                type: Number
            },
            sets: {
                type: Number
            },
            distance: {
                type: Number
            }
        }
    ]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
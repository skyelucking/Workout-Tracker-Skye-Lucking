const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const WorkoutSchema = new Schema({
    
    day: { type: Date, default: () => new Date() },
    
    exercises: [
        {
           
            name: {
                type: String,
                required: true,
                trim: true
            },
            type: {
                type: String,
                required: true,
                trim: true
            },
            duration: {
                type: Number,
                required: true
            },
            weight: {
                type: Number,
                required: true
            },
            reps: {
                type: Number,
                required: true
            },
            sets: {
                type: Number,
                required: true
            },
            distance: {
                type: Number,
                required: true
            },
        },
    ],

},
    {
        toJSON: {
            
            virtuals: true,
        },
    }
);

WorkoutSchema.virtual("totalDuration").get(function () {
    const duration = this.exercises.reduce((acc, curr) => {
        return acc + curr.duration;
        }, 0);
    return duration;
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
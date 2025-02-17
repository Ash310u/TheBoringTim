import mongoose from "mongoose";

const moodSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    date: {
        type: Date,
        required: true
    },
    emotion: {
        type: String,
        required: true,
        enum: ["Happy", "Sad", "Angry", "Excited", "Tired", "Anxious"]
    },
    intensity: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} must be an integer between 0 and 100'
        }
    },
    note: {
        type: String,
        required: false,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const Mood = mongoose.model("Mood", moodSchema);

export default Mood;
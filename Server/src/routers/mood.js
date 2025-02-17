import express from 'express';
import Mood from '../models/Mood.js';
import auth from '../middleware/auth.js';

// Update mood
const router = new express.Router();

router.post('/create', auth, async (req, res) => {
    try {
        const { intensity, emotion, date, note } = req.body;
        
        // Check if mood already exists for this date and user
        const existingMood = await Mood.findOne({
            userId: req.user._id,
            date: new Date(date)
        });

        if (existingMood) {
            // Update existing mood
            existingMood.intensity = intensity;
            existingMood.emotion = emotion;
            existingMood.note = note;
            
            const updatedMood = await existingMood.save();
            return res.json(updatedMood);
        }

        // Create new mood if none exists
        const newMood = new Mood({
            userId: req.user._id,
            intensity,
            emotion,
            date,
            note
        });

        const savedMood = await newMood.save();
        res.status(201).json(savedMood);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get moods by userId and date range
router.get('/user/:userId', auth, async (req, res) => {
    try {
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;
        console.log(startDate, endDate)
        const query = {
            userId: req.params.userId,
        };

        // Add date range to query if provided
        if (startDate && endDate) {
            query.date = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        const moods = await Mood.find(query).sort({ date: -1 });
        res.json(moods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
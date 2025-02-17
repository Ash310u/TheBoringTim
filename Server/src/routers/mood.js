import express from 'express';
import Mood from '../models/Mood.js';
import auth from '../middleware/auth.js';

// Update mood
const router = new express.Router();

router.post('/create', auth, async (req, res) => {
    try {
        const { intensity, emotion, date, note } = req.body;
        
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
        const { startDate, endDate } = req.query;
        
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
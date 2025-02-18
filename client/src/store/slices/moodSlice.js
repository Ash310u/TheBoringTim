import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    moods: {},
    emotions: [
        { name: 'Happy', emoji: '😊' },
        { name: 'Sad', emoji: '😢' },
        { name: 'Angry', emoji: '😠' },
        { name: 'Excited', emoji: '🤩' },
        { name: 'Tired', emoji: '😴' },
        { name: 'Anxious', emoji: '😰' },
    ]
};

const moodSlice = createSlice({
    name: 'mood',
    initialState,
    reducers: {
        setMood: (state, action) => {
            const { _id, userId, date, emotion, intensity, note } = action.payload;
            const emotionObj = state.emotions.find(e => e.name == emotion);
            const dateObj = new Date(date);

            const moodData = {
                _id,
                userId,
                date,
                emotion: emotionObj,
                intensity,
                note,
            };

            // Create a single number key from date components
            const singleNumber = Number(
                dateObj.getFullYear().toString() +
                (dateObj.getMonth() + 1).toString().padStart(2, '0') +
                dateObj.getDate().toString().padStart(2, '0')
            );

            // Use the single number as the key in the moods object
            state.moods[singleNumber] = moodData;
        },
        setMonthMoods: (state, action) => {
            const moods = action.payload;

            // Clear existing moods
            state.moods = {};

            // Add all moods with date keys in ascending order
            moods.forEach(mood => {
                const dateObj = new Date(mood.date);
                const singleNumber = Number(
                    dateObj.getFullYear().toString() +
                    (dateObj.getMonth() + 1).toString().padStart(2, '0') +
                    dateObj.getDate().toString().padStart(2, '0')
                );

                const emotionObj = state.emotions.find(e => e.name === mood.emotion);
                
                state.moods[singleNumber] = {
                    _id: mood._id,
                    userId: mood.userId,
                    date: mood.date,
                    emotion: emotionObj,
                    intensity: mood.intensity,
                    note: mood.note
                };
            });
        },
        clearMoods: (state) => {
            state.moods = {};
        }
    }
});

export const { setMood, setMonthMoods, clearMoods } = moodSlice.actions;
export const moodReducer = moodSlice.reducer;
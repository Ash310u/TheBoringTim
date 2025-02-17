import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const moodApi = createApi({
    reducerPath: 'moodApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/api/moods',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        createMood: builder.mutation({
            query: (moodData) => ({
                url: '/create',
                method: 'POST',
                body: moodData,
            }),
        }),
        getMoods: builder.query({
            query: ({ userId, startDate, endDate }) => ({
                url: `/user/${userId}?startDate=${startDate}&endDate=${endDate}`,
                method: 'GET',
            }),
        }),
    }),
});

export const { useCreateMoodMutation, useGetMoodsQuery } = moodApi;

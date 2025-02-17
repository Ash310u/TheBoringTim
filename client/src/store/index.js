import { configureStore } from '@reduxjs/toolkit';
import { loginApi } from './apis/loginApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authReducers } from './slices/authSlice';
import { userAccApi } from './apis/userAccApi';
import { userReducers } from './slices/userSlice';
import { moodApi } from './apis/moodApi';
import { moodReducer } from './slices/moodSlice';
const store = configureStore({
    reducer: {
        auth: authReducers,
        user: userReducers,
        mood: moodReducer,
        [loginApi.reducerPath]: loginApi.reducer,
        [userAccApi.reducerPath]: userAccApi.reducer,
        [moodApi.reducerPath]: moodApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: [
                    'userAcc/executeQuery/fulfilled',
                    'userAcc/executeMutation/fulfilled',
                    'moodApi/executeMutation/fulfilled'
                ],
                // Ignore these field paths in all actions
                ignoredActionPaths: ['payload.data', 'meta.baseQueryMeta.request'],
                // Ignore these paths in the state
                ignoredPaths: [
                    `${userAccApi.reducerPath}.queries`,
                    `${moodApi.reducerPath}.mutations`
                ],
            },
        })
        .concat(loginApi.middleware)
        .concat(userAccApi.middleware)
        .concat(moodApi.middleware)
    },
});


setupListeners(store.dispatch);

export default store;

export { useSignupMutation, useLoginMutation } from "./apis/loginApi"
export { useGetUserQuery, useGetAvatarQuery, useUploadAvatarMutation, useDeleteAvatarMutation } from "./apis/userAccApi"
export { useCreateMoodMutation, useGetMoodsQuery } from "./apis/moodApi"

export { setMood, setMonthMoods, clearMoods } from "./slices/moodSlice"
export { setToken, clearToken, setUserId, clearUserId } from "./slices/authSlice"
export { setUserAvatar, setUserInfo, setJoinedDate, clearUserData } from "./slices/userSlice"

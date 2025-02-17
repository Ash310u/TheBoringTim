import { configureStore } from '@reduxjs/toolkit';
import { loginApi } from './apis/loginApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authReducers } from './slices/authSlice';
import { userAccApi } from './apis/userAccApi';
import { userReducers } from './slices/userSlice';

const store = configureStore({
    reducer: {
        auth: authReducers,
        user: userReducers,
        [loginApi.reducerPath]: loginApi.reducer,
        [userAccApi.reducerPath]: userAccApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: [
                    'userAcc/executeQuery/fulfilled',
                    'userAcc/executeMutation/fulfilled'
                ],
                // Ignore these field paths in all actions
                ignoredActionPaths: ['payload.data'],
                // Ignore these paths in the state
                ignoredPaths: [`${userAccApi.reducerPath}.queries`],
            },
        })
        .concat(loginApi.middleware)
        .concat(userAccApi.middleware)
    },
});


setupListeners(store.dispatch);

export default store;

export { useSignupMutation, useLoginMutation } from "./apis/loginApi"
export { useGetUserQuery, useGetAvatarQuery, useUploadAvatarMutation, useDeleteAvatarMutation } from "./apis/userAccApi"

export { setToken, clearToken, setUserId, clearUserId } from "./slices/authSlice"
export { setUserAvatar, setUserInfo, setJoinedDate, clearUserData } from "./slices/userSlice"

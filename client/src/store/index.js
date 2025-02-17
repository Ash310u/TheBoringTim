import { configureStore } from '@reduxjs/toolkit';
import { loginApi } from './apis/loginApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authReducers } from './slices/authSlice';
import { userAccApi } from './apis/userAccApi';

const store = configureStore({
    reducer: {
        auth: authReducers,
        [loginApi.reducerPath]: loginApi.reducer,
        [userAccApi.reducerPath]: userAccApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(loginApi.middleware)
            .concat(userAccApi.middleware)
    },
});


setupListeners(store.dispatch);

export default store;

export { useSignupMutation, useLoginMutation } from "./apis/loginApi"
export { useGetUserQuery, useGetAvatarQuery } from "./apis/userAccApi"

export {
    setToken,
    clearToken,
    setUserId,
    clearUserId
} from "./slices/authSlice"

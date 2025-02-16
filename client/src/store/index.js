import { configureStore } from '@reduxjs/toolkit';
import { loginApi } from './apis/loginApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authReducers } from './slices/authSlice';

const store = configureStore({
    reducer: {
        auth: authReducers,
        [loginApi.reducerPath]: loginApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(loginApi.middleware)
    },
});


setupListeners(store.dispatch);

export default store;

export { useSignupMutation, useLoginMutation } from "./apis/loginApi"
export {
    setToken,
    clearToken,
    setUserId,
    clearUserId
} from "./slices/authSlice"
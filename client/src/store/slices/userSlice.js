import { createSlice } from '@reduxjs/toolkit';
import defaultAvatar from "../../assets/default_avatar.jpg";

const initialState = {
    username: null,
    age: null,
    email: null,
    avatarUrl: defaultAvatar,
    joinedDate: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserAvatar: (state, action) => {
      state.avatarUrl = action.payload;
    },
    setUserInfo: (state, action) => {
      const { username, email, age } = action.payload;
      state.username = username;
      state.email = email;
      state.age = age;
      state.joinedDate = new Date().toISOString();
    },
    setJoinedDate: (state, action) => {
      state.joinedDate = action.payload;
    },
    clearUserData: () => {
      return initialState;
    },
  },
});

export const { setUserAvatar, setUserInfo, setJoinedDate, clearUserData } = userSlice.actions;
export const userReducers = userSlice.reducer;

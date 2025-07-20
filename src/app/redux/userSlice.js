// store/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: 0,
  name: '',
  email: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
        state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
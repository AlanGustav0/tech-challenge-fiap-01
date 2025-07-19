import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Import the user slice reducer

const store = configureStore({ 
    reducer: {
    user: userReducer
  }

});
export default store;
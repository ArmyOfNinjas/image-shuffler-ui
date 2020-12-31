import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/login/userSlice';
import filesReducer from '../features/appHeader/filesSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    files: filesReducer,
  },
});




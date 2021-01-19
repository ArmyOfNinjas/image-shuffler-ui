import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/login/userSlice";
import filesReducer from "../features/appHeader/filesSlice";
import urlReducer from "../features/appHeader/urlSlice";
import tokenReducer from "../features/login/tokenSlice";
import fileNameReducer from "../features/appHeader/fileNameSlice"
import dateTimeReducer from "../features/appHeader/dateTimeSlice"

export default configureStore({
  reducer: {
    user: userReducer,
    files: filesReducer,
    urls: urlReducer,
    token: tokenReducer,
    fileNames: fileNameReducer,
    dateTime: dateTimeReducer,
  },
});

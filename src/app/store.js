import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/login/userSlice";
import filesReducer from "../features/appHeader/filesSlice";
import urlReducer from "../features/appHeader/urlSlice";
import tokenReducer from "../features/login/tokenSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    files: filesReducer,
    urls: urlReducer,
    token: tokenReducer,
  },
});

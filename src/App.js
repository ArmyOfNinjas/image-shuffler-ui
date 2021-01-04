import React, { useState, useEffect } from "react";
import "./App.css";
import AppHeader from "./features/appHeader/AppHeader";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "./features/login/userSlice";
import Login from "./features/login/Login";
import { auth } from "./firebase";
import { login, logout } from "./features/login/userSlice";
import Grid from "./features/grid/Grid";
import { selectUrls } from "./features/appHeader/urlSlice";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const imgUrls = useSelector(selectUrls);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("user is", authUser);
      setUserData(JSON.stringify(authUser, null, 2));
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
            accessToken: authUser.ya,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  // useEffect(() => {
  //   console.log(imgUrls)
  // }, [imgUrls])

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <div className="app">
      {user ? (
        <>
          <AppHeader className="appHeader"></AppHeader>
          <Grid className="imageGrid"></Grid>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;

import React, { useEffect } from 'react';
import './App.css';
import AppHeader from './features/appHeader/AppHeader';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from "./features/login/userSlice";
import Login from './features/login/Login';
import { auth } from './features/firebase';
import { login, logout } from "./features/login/userSlice"

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("user is", authUser)
      if (authUser) {
        dispatch(login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName
        }))
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch])

  return (
    <div className="app">
      {/* <AppHeader className="appHeader"></AppHeader>
      <h1>Image Shuffler App</h1> */}

      {user ? (
        <>
          <AppHeader className="appHeader"></AppHeader>
          <h1>Image Shuffler App</h1>
        </>
      ) : (
          <Login />
        )}
    </div>
  );
}

export default App;

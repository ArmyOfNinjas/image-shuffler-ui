import React from 'react';
import "./Login.css";
import { Button } from "@material-ui/core"
import { auth, provider } from "../../firebase";
import loginImg from "../../images/loginImgLight1920.jpg"

function Login() {
    const signIn = e => {
        //do google login...
        auth
            .signInWithPopup(provider)
            .catch(error => alert(error.message));
    }
    return (
        <div className="login">
            <div className="login_logo">
                <img src={loginImg} className="login__img" alt="" />
            </div>
            <Button onClick={signIn}>Sign In with Google</Button>
        </div>
    );
}

export default Login;
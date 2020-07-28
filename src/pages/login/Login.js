import React from 'react';
import LoginForm from "./LoginForm";


const Login = (props) => {

    const {onLogin} = props

    return (
        <div className="login-pages">
            <div className="login-form">
                <LoginForm onLogin={()=>onLogin()}/>
            </div>
        </div>
    );
};

export default Login;

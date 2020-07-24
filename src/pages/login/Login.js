import React, {Component} from 'react';
import LoginForm from "./LoginForm";

class Login extends Component {

    onLogin = ()=>{
        this.props.onLogin()
    }

    render() {
        return (
            <div className="login-pages">
                <div className="login-form">
                    <LoginForm onLogin={()=>this.onLogin()}/>
                </div>
            </div>
        );
    }
}

export default Login;
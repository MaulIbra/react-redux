import React, {Component} from 'react';
import HeaderComponent from "../../component/HeaderComponent";
import Home from "../home/Home";
import {Route, Switch,withRouter,Redirect} from "react-router-dom";
import Login from "../login/Login";
import NotFound from "../../component/NotFoundComponent";
import MenuContainer from "../menu/MenuContainer";

const routes = [
    {id: 1, path: '/home', component: Home},
    {id: 2, path: '/menu', component: MenuContainer},
];

class MainPages extends Component {

    state = {
        auth:false,
        token: sessionStorage.getItem("token")
    };

    onLogin = () => {
        this.setState({
            auth : true
        })
        this.props.history.push({
            pathname: '/home'
        })
    };

    onLogout = ()=>{
        sessionStorage.clear()
        this.setState({
            auth : false
        })
        this.props.history.push({
            pathname: '/'
        })
    }

    componentDidMount() {
        if (sessionStorage.getItem("token") === null){
            this.props.history.push({
                pathname: '/'
            })
        }else{
            this.props.history.push({
                pathname: this.props.history.location.pathname
            })
        }
    }

    render() {

        const routeList = routes.map((route) => {
            return <Route
                key={route.id}
                path={route.path} render={
                (props) => {
                    return this.state.token !== null || this.state.auth ?
                        <route.component {...props}/> : <Redirect to='/'/>
                }
            }/>
        });

        return (
            <div>
                <HeaderComponent logout={()=>this.onLogout()}/>
                <Switch>
                    <Route path="/" exact>
                        <Login onLogin={this.onLogin}/>
                    </Route>
                    {routeList}
                    <Route path="*">
                        <NotFound/>
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default withRouter(MainPages);
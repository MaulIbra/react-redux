import React from "react";
import {BrowserRouter,Route,Switch} from "react-router-dom";
import CompA from "../component/CompA";
import CompB from "../component/CompB";


const Nav = ()=>{
    return(
        <div>
            <BrowserRouter>
                <div>
                    <Route path='/' exact component={CompA}/>
                    <Route path='/compB' component={CompB}/>
                </div>
            </BrowserRouter>
        </div>
    )
};

export default Nav
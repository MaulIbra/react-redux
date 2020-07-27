import {combineReducers} from "redux";
import menuTodo from "./MenuReducer";


const menuReducer = combineReducers({
    menuTodo
})

export default menuReducer
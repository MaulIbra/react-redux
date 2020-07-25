import menuReducer from "./menu";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    menuReducer : menuReducer
})

export default rootReducer
import menuReducer from "./menu";
import {combineReducers} from "redux";
import categoryReducer from "./category";

const rootReducer = combineReducers({
    menuReducer : menuReducer,
    categoryReducer : categoryReducer
})

export default rootReducer
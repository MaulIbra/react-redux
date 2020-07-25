import {combineReducers} from "redux";
import categoryTodo from "./CategoryReducer";


const categoryReducer = combineReducers({
    categoryTodo
})

export default categoryReducer
const initialState = {
    category  : [],
}

const categoryTodo = (state = initialState, action)=> {
    switch (action.type) {
        case 'SET_CATEGORY' :
            return {...state,category : action.payload};
        default:
            return state
    }
}

export default categoryTodo
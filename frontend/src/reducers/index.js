import { ActionTypes } from "../constants/action_types.js"

// define the intial state of the application as an empty set of todos, and an empty user
const initialState = {
    todos: [],
    user: {},
    csrfToken: ""
}

// defines the base reducer for the store
export function baseReducer(state = initialState, action)
{
    switch (action.type)
    {
        // handler for adding a todo item
        case ActionTypes.ADD_TODO:
            // returns a new object with the original state except a modified todos array
            return {
                ...state,
                todos: [
                    ...state.todos,
                    action.todo
                ]
            }
        // handler for changing the current user
        case ActionTypes.CHANGE_USER:
            // returns a new object with the original state but a new user object
            return {
                ...state,
                user: action.user
            }
        // handler for changing the CSRF token
        case ActionTypes.CHANGE_CSRF:
            return {
                ...state,
                csrfToken: action.csrfToken
            }
        default:
            return state;
    }
}
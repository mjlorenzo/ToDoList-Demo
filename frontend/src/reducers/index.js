import Actions from './../actions';
import { ActionTypes } from './../constants/action_types';

// define the intial state of the application as an empty set of todos, and an empty user
const initialState = {
    todos: [],
    user: {
        username: "",
        authToken: ""
    },
    csrfToken: "",
    loginError: ""
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
        case ActionTypes.LOGIN_ERROR:
            return {
                ...state,
                loginError: action.error
            }
        // handler for successful retrieval of todos
        case ActionTypes.LOAD_TODOS_SUCCESS:
            return {
                ...state,
                todos: action.todos
            }
        default:
            return state;
    }
}
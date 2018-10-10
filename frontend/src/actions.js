import { ActionTypes } from './constants/action_types';
import { postFormDataCSRF } from './utilities.js';

const LOGIN_URL = "/rest-auth/login/"

// define a class collection of action creators
// these functions usually just return a uniformly formatted action object
export default class Actions 
{
    // addToDo action creator
    addToDo(todo) 
    {
        return {
            type: ActionTypes.ADD_TODO,
            todo: todo
        }
    }
    

    // delete to do action creator
    delToDo(id)
    {
        return {
            type: ActionTypes.DEL_TODO,
            id: id
        }
    }

    // change user action creator
    changeUser(user) {
        return {
            type: ActionTypes.CHANGE_USER,
            user: user
        }
    }

    // change CSRF action creator
    changeCSRF(token) {
        return {
            type: ActionTypes.CHANGE_CSRF,
            csrfToken: token
        }
    }
}

export function changeCSRF(token) {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.CHANGE_CSRF,
            csrfToken: token
         });   
    }       
}

export function login(formData, csrfToken) {
    return (dispatch) => {
            postFormDataCSRF(LOGIN_URL, formData, csrfToken).then( response => {
                console.log(response.status);
            }); 
    };
}


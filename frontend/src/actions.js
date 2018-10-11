import { ActionTypes } from './constants/action_types';
import { postFormDataCSRF, getAuthenticated, postJSONFullAuth } from './utilities.js';

const LOGIN_URL = "/rest-auth/login/";
const LOGOUT_URL = "/rest-auth/logout/";
const TODOS_URL = "/todos/";

// define a class collection of action creators
// these functions usually just return a uniformly formatted action object

export function changeCSRF(token) {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.CHANGE_CSRF,
            csrfToken: token
         });   
    }       
}

export function changeUser(username, authToken) {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.CHANGE_USER,
            user: {
                username: username,
                authToken: authToken
            }
        });
    }
}

export function loadTodosSuccess(todos) {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.LOAD_TODOS_SUCCESS,
            todos: todos
        });
    }
}

// action creator to perform a login request with the network and dispatch actions according
// to the response
// accepts the login credentials as FormData and a required CSRF token
export function login(formData, csrfToken) {
    return (dispatch) => {
        postFormDataCSRF(LOGIN_URL, formData, csrfToken).then( response => {
            if (response.ok) {
                return response.json()
            }
            else {
                throw response.status + " " + response.statusText;
            }
        }).then( (data) => {
            dispatch(changeUser(formData.get("username"), data.key));
        }).catch(
            // [TODO]: Handle this a lot better 
            (error) => console.log(error)); 
    };
}

// action creator to fetch a list of todos for the logged in user represented by its authToken
// if the fetch is successful, it will dispatch an action to load the new todo list
// if there is an error, it will throw an exception and catch it
export function fetchTodos(authToken) {
    return (dispatch) => {
        return getAuthenticated(TODOS_URL, authToken).then((response) => {
            if (response.ok) {
                return response.json();
            }
            else {
                throw response.status + " " + response.statusText;
            }
        }).then((data) => {
            dispatch(loadTodosSuccess(data));
        }).catch(
            // [TODO]: Handle this a lot better
            (error) => console.log(error));
    }
}

// action creator to logout with supplied credentials
// if successful, it will dispatch a change user action with empty strings, indicating no user
// if there is an error, it will throw an exception and catch it
export function logout(authToken, csrfToken) {
    return (dispatch) => {
        return postJSONFullAuth(LOGOUT_URL, null, authToken, csrfToken).then(response => {
            if (response.ok) {
                return response.json();
            }
            else {
                throw response.status + " " + response.statusText;
            }
        }).then(data => {
            dispatch(changeUser("", ""));
        }).catch(
            // [TODO]: Handle this a lot better
            error => console.log(error));
    }
}


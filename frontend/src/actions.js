import { ActionTypes } from './constants/action_types';
import { getAuthenticated, postAuthenticated, post, 
    deleteAuthenticated, patchAuthenticated } from './network';

const LOGIN_URL = "/rest-auth/login/";
const LOGOUT_URL = "/rest-auth/logout/";
const TODOS_URL = "/todos/";

// define a collection of action creators
// these functions usually just return a uniformly formatted action object

function changeUser(username, authToken) {
    return {
        type: ActionTypes.CHANGE_USER,
        user: {
            username: username,
            authToken: authToken
        }
    };
}

function loadTodosSuccess(todos) {
    return {
            type: ActionTypes.LOAD_TODOS_SUCCESS,
            todos: todos
    };
}

function addTodo(todo) {
    return {
        type: ActionTypes.ADD_TODO,
        todo: todo
    };
}

function delTodo(id) {
    return {
        type: ActionTypes.DEL_TODO,
        id: id
    };
}

function togTodo(id) {
    return {
        type: ActionTypes.TOGGLE_TODO,
        id: id
    };
}

// the following action creators are 'thunks'
// they involve asynchronous network actions and can dispatch other actions depending on the 
// resolution of the network request

// action creator to perform a login request with the network and dispatch actions according
// to the response
// accepts the login credentials
export function login(formData) {
    return (dispatch) => {
        post(LOGIN_URL, formData).then( (response) => {
            dispatch(changeUser(formData.get("username"), response.data.key));
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
            dispatch(loadTodosSuccess(response.data));
        }).catch(
            // [TODO]: Handle this a lot better
            (error) => console.log(error));
    }
}

// action creator to logout with supplied credentials
// if successful, it will dispatch a change user action with empty strings, indicating no user
// if there is an error, it will throw an exception and catch it
export function logout(authToken) {
    return (dispatch) => {
        return postAuthenticated(LOGOUT_URL, null, authToken).then(response => {
            dispatch(changeUser("", ""));
        }).catch(
            // [TODO]: Handle this a lot better
            error => console.log(error));
    }
}

// action creator to submit a new todo for the current user's list
// if successful, it will dispatch an add todo action with the newly created todo item
// if there is an error, it will throw an exception and catch it
export function submitTodo(todo, authToken) {
    return (dispatch) => {
        return postAuthenticated(TODOS_URL, todo, authToken).then(response => {
            dispatch(addTodo(response.data));
        }).catch(
            // [TODO]: Handle this a lot better
            error => console.log(error));
    }
}

// action creator to delete a specific todo from the current user by sending an HTTP DELETE
// request to the url '/todos/{id}/'
// if successful, it will dispatch a delete todo action with the former todo's ID
// if there is an error, it will throw an exception and catch it
export function deleteTodo(id, authToken) {
    return (dispatch) => {
        // generate the appropriate URL
        var deleteURL = TODOS_URL + id + "/";
        return deleteAuthenticated(deleteURL, authToken).then((response) => {
            // dispatch a delete action for that ID
            dispatch(delTodo(id));
        }).catch(
            // [TODO]: Handle this a lot better
            error => console.log(error));
    }
}

// action creator to toggle the 'complete' status of a specific todo by sending an HTTP PATCH
// request to the url '/todos/{id}/'
// technically any valid data contained in the request (that correspond to appropriate model fields)
// will be persisted to the resource but for our purposes we just need to toggle the 'complete' field
export function toggleTodo(id, data, authToken) {
    return (dispatch) => {
        // generate the appropriate URL
        var patchURL = TODOS_URL + id + "/";
        return patchAuthenticated(patchURL, data, authToken).then((response) => {
            // dispatch a toggle action for that ID
            dispatch(togTodo(id));
        }).catch(
            // [TODO]: Handle this a lot better
            error => console.log(error));
    }
}
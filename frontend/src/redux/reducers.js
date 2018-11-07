import Todo from '../classes/Todo';
import Sorts from './sorts';
import ActionTypes from './action_types';

const ITEMS_PER_PG = 10;

// define the intial state of the application as an empty set of todos, and an empty user
const initialState = {
    todos: [],
    page: {
        current: 1,
        itemsPerPage: ITEMS_PER_PG
    },
    user: {
        username: "",
        authToken: ""
    },
    error: "",
    currentSort: Sorts.time.descending
}

// utility functions to calculate first/last indices for pages

// defines the base reducer for the store
export function baseReducer(state = initialState, action)
{
    switch (action.type)
    {
        // handler for adding a todo item
        case ActionTypes.ADD_TODO: {
            // create a new array with the added todo
            let addedTodo = new Todo(action.todo);
            let newTodos = [
                ...state.todos,
                addedTodo
            ];

            // returns a new object with the appropriate fields changed to new updated objects
            return {
                ...state,
                todos: newTodos,
            };
        }
        // handler for changing the current user
        case ActionTypes.CHANGE_USER:
            // resets the application state to its initial values but with the currently logged
            // in user information
            return {
                ...initialState,
                user: action.user
            }
        // handler for successful retrieval of todos
        case ActionTypes.LOAD_TODOS_SUCCESS: {
            let newTodos = action.todos.map(todo => new Todo(todo));
            return {
                ...state,
                todos: newTodos,
            }
        }
        // handler for successful deletion of a todo
        // things get more interesting here.. but not much
        case ActionTypes.DEL_TODO: {
            // the ID of each todo is not mapped to its array index but rather its database
            // primary key (possible security issue?), so we need to find the proper array index
            let index = state.todos.findIndex(todo => todo.id === action.id);
            // findIndex() returns -1 if the item does not exist so we test if the returned index
            // is greater than that
            // if so, we generate a new array composed of new arrays representing the values on either
            // side of the now deleted value
            // otherwise, we just keep the original
            // [QUESTION]: If the index doesn't exist, is it best practice to throw an error?
            let newTodos = index > -1 ? [
                    ...state.todos.slice(0, index),
                    ...state.todos.slice(index + 1)
                ] : state.todos;
            // now we can return our new state object
            return {
                ...state,
                todos: newTodos,
            };
        }
        // handler for toggling a todo between complete and not
        // since the entire state is immutable, we'll copy the old array and flip the 'complete' field
        // at the index of the targeted todo
        case ActionTypes.TOGGLE_TODO: {
            // find the index of the targeted todo
            let index = state.todos.findIndex(todo => todo.id === action.id);

            // construct a new array or return the old one
            let newTodos = state.todos;
            if (index > -1) {
                // the index is valid, so copy the old array
                newTodos = state.todos.slice();
                // create a new Todo with an inverted complete field
                let newTodo = new Todo(state.todos[index]);
                newTodo.complete = !newTodo.complete;
                // store it in the same index
                newTodos[index] = newTodo;
            }

            // return the completed state
            return {
                ...state,
                todos: newTodos
            };
        }
        case ActionTypes.CHANGE_SORT: {
            return {
                ...state,
                currentSort: action.sort,
            };
        }
        case ActionTypes.SET_ERROR:
            return {
                ...state,
                error: action.error
            };
        case ActionTypes.CLEAR_ERROR:
            return {
                ...state,
                error: ""
            };
        case ActionTypes.CHANGE_PAGE: {
            return {
                ...state,
                page: {
                    current: action.page,
                    itemsPerPage: state.page.itemsPerPage
                }
            };
        }
        default:
            return state;
    }
}
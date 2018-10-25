import Todo from '../classes/Todo';
import Sorts from '../constants/sorts';
import Page from '../classes/Page';
import ActionTypes from '../constants/action_types';

const ITEMS_PER_PG = 10;

// define the intial state of the application as an empty set of todos, and an empty user
const initialState = {
    todos: [],
    visibleTodos: [],
    page: new Page(1, ITEMS_PER_PG),
    user: {
        username: "",
        authToken: ""
    },
    error: "",
    currentSort: Sorts.time.descending
}

// utility function to create a new sorted todos array using a sort function
function createSortedTodos(todos, sortFunc) {
    // slice creates a copy of the original, sort modifies the new array, return the new array
    return todos.slice().sort(sortFunc);
}

// utility function to obtain a correct visibleTodos array
function createVisibleTodos(todos, page) {
    return todos.slice(page.firstIndex, page.secondIndex + 1);
}

// defines the base reducer for the store
export function baseReducer(state = initialState, action)
{
    switch (action.type)
    {
        // handler for adding a todo item
        case ActionTypes.ADD_TODO: {
            // create a new sorted array with the added todo
            let addedTodo = new Todo(action.todo);
            let newTodos = [
                ...state.todos,
                addedTodo
            ].sort(state.currentSort);

            // check if the new todo is on the current page, if not we should switch to that page
            // find the new index of the inserted Todo
            let index = newTodos.findIndex(todo => todo === addedTodo);
            let newPage = state.page;
            // if the new index isn't in the current page, change the page
            if (state.page.firstIndex > index || state.page.secondIndex < index) {
                let newPageNum = Math.floor(index / state.page.itemsPer) + 1;
                newPage = new Page(newPageNum, state.page.itemsPer);
            }

            // create the new visible todos array
            let newVisibleTodos = createVisibleTodos(newTodos, newPage);

            // returns a new object with the appropriate fields changed to new updated objects
            return {
                ...state,
                todos: newTodos,
                visibleTodos: newVisibleTodos,
                page: newPage
            }
        }
        // handler for changing the current user
        case ActionTypes.CHANGE_USER:
            // resets the application state to its initial values but with the currently logged
            // in user information
            return {
                ...initialState,
                user: action.user
            }
        case ActionTypes.LOGIN_ERROR:
            return {
                ...state,
                loginError: action.error
            }
        // handler for successful retrieval of todos
        case ActionTypes.LOAD_TODOS_SUCCESS: {
            let newTodos = action.todos.map(todo => new Todo(todo)).sort(state.currentSort);
            let newVisibleTodos = createVisibleTodos(newTodos, state.page);
            return {
                ...state,
                todos: newTodos,
                visibleTodos: newVisibleTodos
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
            let newVisibleTodos = createVisibleTodos(newTodos, state.page);
            // now we can return our new state object
            return {
                ...state,
                todos: newTodos,
                visibleTodos: newVisibleTodos
            };
        }
        // handler for toggling a todo between complete and not
        // since the entire state is immutable, we'll copy the old array and flip the 'complete' field
        // at the index of the targeted todo
        case ActionTypes.TOGGLE_TODO: {
            // find the index of the targeted todo
            let index = state.todos.findIndex(todo => todo.id === action.id);

            // construct a new array or return the old one
            let newTodos;
            if (index > -1) {
                // the index is valid, so copy the old array
                newTodos = state.todos.slice();
                // flip the complete flag
                // [QUESTION]: since this array contains objects, technically the new array contains
                //             references to existing state objects. Does flipping this field
                //             instead of replacing the object break the immutable principle?
                newTodos[index].complete = !state.todos[index].complete;
            }
            else {
                newTodos = state.todos;
            }

            let newVisibleTodos = createVisibleTodos(newTodos, state.page);
            // return the completed state
            return {
                ...state,
                todos: newTodos,
                visibleTodos: newVisibleTodos
            };
        }
        case ActionTypes.CHANGE_SORT: {
            let newTodos = createSortedTodos(state.todos, action.sort);
            let newVisibleTodos = createVisibleTodos(newTodos, state.page);
            return {
                ...state,
                currentSort: action.sort,
                todos: newTodos,
                visibleTodos: newVisibleTodos
            };
        }
        case ActionTypes.SET_ERROR:
            return {
                ...state,
                error: action.error
            }
        case ActionTypes.CLEAR_ERROR:
            return {
                ...state,
                error: ""
            }
        case ActionTypes.CHANGE_PAGE: {
            let newVisibleTodos = createVisibleTodos(state.todos, action.page)
            return {
                ...state,
                page: action.page,
                visibleTodos: newVisibleTodos
            }
        }
        default:
            return state;
    }
}
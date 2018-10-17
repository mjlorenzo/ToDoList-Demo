import Todo from '../classes/Todo';
import SortFuncs from '../constants/sort_functions';
import ActionTypes from '../constants/action_types';

// define the intial state of the application as an empty set of todos, and an empty user
const initialState = {
    todos: [],
    user: {
        username: "",
        authToken: ""
    },
    loginError: "",
    currentSort: SortFuncs.time.descending
}

// utility function to create a new sorted todos array using a sort function
function createSortedTodos(todos, sortFunc) {
    // slice creates a copy of the original, sort modifies the new array, return the new array
    return todos.slice().sort(sortFunc);
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
                    new Todo(action.todo)
                // the last line sorts the new todo array in place before it becomes finalized as
                // the store
                ].sort(state.currentSort)
            }
        // handler for changing the current user
        case ActionTypes.CHANGE_USER:
            // returns a new object with the original state but a new user object
            return {
                ...state,
                user: action.user
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
                todos: action.todos.map(todo => new Todo(todo)).sort(state.currentSort)
            }
        // handler for successful deletion of a todo
        // things get more interesting here.. but not much
        case ActionTypes.DEL_TODO:
            // the ID of each todo is not mapped to its array index but rather its database
            // primary key (possible security issue?), so we need to find the proper array index
            var index = state.todos.findIndex(todo => todo.id === action.id);
            // findIndex() returns -1 if the item does not exist so we test if the returned index
            // is greater than that
            // if so, we generate a new array composed of new arrays representing the values on either
            // side of the now deleted value
            // otherwise, we just keep the original
            // [QUESTION]: If the index doesn't exist, is it best practice to throw an error?
            var newTodos = index > -1 ? [
                    ...state.todos.slice(0, index),
                    ...state.todos.slice(index + 1)
                ] : state.todos;
            // now we can return our new state object
            return {
                ...state,
                todos: newTodos
            };
        // handler for toggling a todo between complete and not
        // since the entire state is immutable, we'll copy the old array and flip the 'complete' field
        // at the index of the targeted todo
        case ActionTypes.TOGGLE_TODO:
            // find the index of the targeted todo
            var index = state.todos.findIndex(todo => todo.id === action.id);

            // construct a new array or return the old one
            var newTodos;
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

            // return the completed state
            return {
                ...state,
                todos: newTodos
            };
        case ActionTypes.CHANGE_SORT:
            let newTodos = createSortedTodos(state.todos, action.sort);
            return {
                ...state,
                currentSort: action.sort,
                todos: newTodos
            };
        default:
            return state;
    }
}
// This file contains selectors to retrieve data from state and compute derived
// state where necessary

import { createSelector } from 'reselect';

// username selector
export const userNameSelector = state => state.user.username;
// auth token selector
export const authTokenSelector = state => state.user.authToken;
// current sort selector
export const currentSortSelector = state => state.currentSort;
// basic todos selector
export const todosSelector = state => state.todos;
// number of todos selector
export const totalTodosSelector = state => state.todos.length;
// current page selector
export const currentPageSelector = state => state.page.current;
// items per page selector
export const itemsPerPageSelector = state => state.page.itemsPerPage;
// error selector
export const errorSelector = state => state.error;

// this selector returns a calculated last page number for the todo list
export const lastPageSelector = createSelector(
    [ totalTodosSelector, itemsPerPageSelector ],
    (totalTodos, itemsPerPage) => Math.ceil(totalTodos / itemsPerPage)
);

// this selector calculates the first index of the current page
export const pageFirstIndexSelector = createSelector(
    [ currentPageSelector, itemsPerPageSelector ],
    (currentPage, itemsPerPage) => (currentPage - 1) * itemsPerPage
);

// this selector calculates the last index of the current page
export const pageLastIndexSelector = createSelector(
    [ currentPageSelector, itemsPerPageSelector ],
    (currentPage, itemsPerPage) => (currentPage * itemsPerPage) - 1
);

// this function returns a new array of sorted todos
export const sortedTodosSelector = createSelector(
    [ todosSelector, currentSortSelector ],
    (todos, sort) => {
        // this slice is necessary to avoid mutating the array object stored in redux
        let copy = todos.slice();
        return copy.sort(sort)
    });

// this function returns a subset of a sorted array that represents the todos that are currently
// visible on the page
export const visibleTodosSelector = createSelector(
    [ sortedTodosSelector, pageFirstIndexSelector, pageLastIndexSelector ],
    // the '+ 1' on lastIndex is because slice does not include the index specified by its second
    // argument
    (sortedTodos, firstIndex, lastIndex) => sortedTodos.slice(firstIndex, lastIndex + 1)   
);


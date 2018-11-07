import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { baseReducer } from './redux/reducers';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import AppContainer from './react/AppContainer';
import thunk from 'redux-thunk';

// create the store from our base reducer
const store = createStore(baseReducer, applyMiddleware(thunk));

// entry point for our application, calls react's master render function
// the application is wrapped within a "Provider" component that makes the entire application
// aware of the existence of the Redux store
render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById("root")
);

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { baseReducer } from './reducers/index';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';

// create the store from our base reducer
const store = createStore(baseReducer, applyMiddleware(thunk));

// entry point for our application, calls react's master render function
// the application is wrapped within a "Provider" component that makes the entire application
// aware of the existence of the Redux store
render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);

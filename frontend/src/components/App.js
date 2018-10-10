import { Component } from "react";
import LogInForm from './LogInForm.js';
import React from 'react';
import ReactDOM from 'react-dom';
import { readCookie } from '../cookies.js';
import Actions from '../actions';
import { connect } from 'react-redux';
import { changeCSRF } from "../actions"

const CSRF_TOKEN_ID = "csrftoken";

// function defining how to map actions to properties of the component
const mapDispatchToProps = (dispatch) =>
{
    return {
        changeCSRF: csrf => { return dispatch(changeCSRF(csrf)); }
    };
}

// class defining the container component for the entire To Do List application
class RRApp extends Component
{
    // is the mystery solved?
    constructor(props)
    {
        super(props);
    }

    // when the application first starts, nab the CSRF token from the cookie
    componentDidMount()
    {
        let csrf = readCookie(CSRF_TOKEN_ID);
        this.props.changeCSRF(csrf);
    }

    // override the render method from react
    render()
    {
        // right now, only return the login form
        return (
            <div>
                <LogInForm />
            </div>
        );
    }
}

// Fire off connect() to tie the component to Redux
const App = connect(null, mapDispatchToProps)(RRApp);
export default App;
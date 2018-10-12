import { Component } from "react";
import LogInForm from './LogInForm';
import ToDoList from './ToDoList';
import Header from './Header';
import React from 'react';
import { readCookie } from '../cookies';
import { connect } from 'react-redux';
import { changeCSRF } from "../actions";

const CSRF_TOKEN_ID = "csrftoken";

// function defining how to map actions to properties of the component
const mapDispatchToProps = {
    changeCSRF: changeCSRF
}

function mapStateToProps(state) {
    return {
        username: state.user.username
    }
}

// class defining the container component for the entire To Do List application
class RRApp extends Component
{
    // when the application first starts, nab the CSRF token from the cookie
    componentDidMount()
    {
        let csrf = readCookie(CSRF_TOKEN_ID);
        this.props.changeCSRF(csrf);
    }

    // override the render method from react
    render()
    {
        let component;
        if (this.props.username.length !== 0)
            component = <ToDoList />;
        else
            component = <LogInForm />;

        return (
            <span>
                <Header />
                {component}
            </span>
        );
    }
}

// Fire off connect() to tie the component to Redux
const App = connect(mapStateToProps, mapDispatchToProps)(RRApp);
export default App;
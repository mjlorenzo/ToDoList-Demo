import { Component } from 'react';
import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions';
import { REGISTER_VIEW } from './App';

// define some constants
const USER_INPUT_ID = "username";
const PASS_INPUT_ID = "password";
const FORM_ID = "loginform";

// map relevant action creators to properties
const mapDispatchToProps = {
    login: login
}

// describes a form used to log a user in
class RRLogInForm extends Component
{
    constructor(props)
    {
        // call Component's constructor
        super(props);

        // bind the submit handler to the current instance
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onViewClick = this.onViewClick.bind(this);
    }

    // event handler for clicking the Log In button
    handleSubmit(event)
    {
        // stop the browser from taking action
        event.preventDefault();

        // create a new FormData object, pass form data to the constructor
        var formData = new FormData(document.getElementById(FORM_ID));

        // perform the network request through redux-thunk
        this.props.login(formData);
    }

    onViewClick(event)
    {
        this.props.onViewClick(REGISTER_VIEW);
    }

    // render the login form
    render()
    {
        return (
            <form className="entryForm" id={FORM_ID} onSubmit={this.handleSubmit}>
                <div>
                    <span>Username:</span>
                    <input type='text' id={USER_INPUT_ID} name={USER_INPUT_ID}></input>
                </div>
                <div>
                    <span>Password:</span>
                    <input type='password' id={PASS_INPUT_ID} name={PASS_INPUT_ID}></input>
                </div>
                <span onClick={this.onViewClick}>Register</span>
                <button type='submit'>Log In</button>
            </form>
        );
    }
}

// connect() the component to the store
const LogInForm = connect(null, mapDispatchToProps)(RRLogInForm);
export default LogInForm;
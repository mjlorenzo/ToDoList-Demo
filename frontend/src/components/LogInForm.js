import { Component } from 'react';
import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions';

// define some constants
const USER_INPUT_ID = "username";
const EMAIL_INPUT_ID = "email";
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
        // [QUESTION]: Why is it necessary here?
        super(props);

        // bind the submit handler to the current instance
        this.handleSubmit = this.handleSubmit.bind(this);
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

    // render the login form
    render()
    {
        return (
            <form id={FORM_ID} onSubmit={this.handleSubmit}>
                <div>
                    <span>Username:</span>
                    <input type='text' id={USER_INPUT_ID} name={USER_INPUT_ID}></input>
                </div>
                <div>
                    <span>Email:</span>
                    <input type='text' id={EMAIL_INPUT_ID} name={EMAIL_INPUT_ID}></input>
                </div>
                <div>
                    <span>Password:</span>
                    <input type='text' id={PASS_INPUT_ID} name={PASS_INPUT_ID}></input>
                </div>
                <button type='submit'>Log In</button>
            </form>
        );
    }
}

// connect() the component to the store
const LogInForm = connect(null, mapDispatchToProps)(RRLogInForm);
export default LogInForm;
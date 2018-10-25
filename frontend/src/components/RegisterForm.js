import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../actions';
import { LOGIN_VIEW } from './App';

const FORM_ID = "REGISTER_FORM";
const USER_INPUT_ID = "username";
const PASS_INPUT_ID1 = "password1";
const PASS_INPUT_ID2 = "password2";

const mapDispatchToProps = {
    register: register
}

// This component will represent a form used to register a new user

class RRRegisterForm extends Component
{
    constructor(props)
    {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onViewClick = this.onViewClick.bind(this);
    }

    handleSubmit(event)
    {
        event.preventDefault();

        // create a new FormData object with the values from the form
        var formData = new FormData(document.getElementById(FORM_ID));

        this.props.register(formData);
    }

    onViewClick(event)
    {
        this.props.onViewClick(LOGIN_VIEW);
    }

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
                    <input type='password' id={PASS_INPUT_ID1} name={PASS_INPUT_ID1}></input>
                </div>
                <div>
                    <span>Confirm Password:</span>
                    <input type='password' id={PASS_INPUT_ID2} name={PASS_INPUT_ID2}></input>
                </div>
                <span onClick={this.onViewClick}>Login</span>
                <button type='submit'>Register</button>
            </form>
        )
    }
}

const RegisterForm = connect(null, mapDispatchToProps)(RRRegisterForm);
export default RegisterForm;
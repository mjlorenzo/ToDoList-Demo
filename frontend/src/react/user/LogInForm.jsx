import { PureComponent } from 'react';
import React from 'react';
import { REGISTER_VIEW } from '../App';
import PropTypes from 'prop-types';

const FORM_ID = "LOGIN_FORM";

// describes a form used to log a user in
class LogInForm extends PureComponent
{
    constructor(props)
    {
        // call Component's constructor
        super(props);

        // bind the submit handler to the current instance
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUserChangeOrBlur = this.handleUserChangeOrBlur.bind(this);
        this.handlePassChangeOrBlur = this.handlePassChangeOrBlur.bind(this);
        this.onViewClick = this.onViewClick.bind(this);

        this.state = {
            username: "",
            password: ""
        }
    }

    // event handler for clicking the Log In button
    handleSubmit(event)
    {
        // stop the browser from taking action
        event.preventDefault();

        // basic validation, make sure neither field is blank
        if (this.state.username === "") {
            this.props.errorHandler("The username field cannot be blank");
            return;
        }
        if (this.state.password === "") {
            this.props.errorHandler("The password field cannot be blank");
            return;
        }
        
        // perform the network request through redux-thunk
        this.props.submitHandler(this.state);
    }

    onViewClick(event)
    {
        this.props.onViewClick(REGISTER_VIEW);
    }

    handleUserChangeOrBlur({ target })
    {
        this.setState({
            username: target.value
        });
    }

    handlePassChangeOrBlur({ target })
    {
        this.setState({
            password: target.value
        });
    }


    // render the login form
    render()
    {
        return (
            <form className="entryForm" id={FORM_ID} onSubmit={this.handleSubmit}>
                <div>
                    <span>Username:</span>
                    <input type='text'
                           name='username'
                           onChange={this.handleUserChangeOrBlur}
                           onBlur={this.handleUserChangeOrBlur}/>                
                </div>
                <div>
                    <span>Password:</span>
                    <input type='password'
                           name='password'
                           onChange={this.handlePassChangeOrBlur}
                           onBlur={this.handlePassChangeOrBlur}/>
                </div>
                <span className='viewLink' onClick={this.onViewClick} >Register</span>
                <button style={{float: "right"}} type='submit'>Log In</button>
            </form>
        );
    }
}

LogInForm.propTypes = {
    onViewClick: PropTypes.func.isRequired,
    submitHandler: PropTypes.func.isRequired
}

export default LogInForm;
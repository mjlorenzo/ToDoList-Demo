import React from 'react';
import { PureComponent } from 'react';
import { LOGIN_VIEW } from '../App';
import PropTypes from 'prop-types';

const FORM_ID = "REGISTER_FORM";
const USER_INPUT_ID = "username";
const PASS_INPUT_ID1 = "password1";
const PASS_INPUT_ID2 = "password2";

// This component will present a form used to register a new user

class RegisterForm extends PureComponent
{
    constructor(props)
    {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUserChangeOrBlur = this.handleUserChangeOrBlur.bind(this);
        this.handlePass1ChangeOrBlur = this.handlePass1ChangeOrBlur.bind(this);
        this.handlePass2ChangeOrBlur = this.handlePass2ChangeOrBlur.bind(this);
        this.onViewClick = this.onViewClick.bind(this);
    
        this.state = {
            username: "",
            password1: "",
            password2: ""
        };
    }

    handleSubmit(event)
    {
        event.preventDefault();

        // basic validation, make sure no field is blank and pass1 matches pass2
        if (this.state.username === "") {
            this.props.errorHandler("The username field cannot be blank");
            return;
        }
        if (this.state.password1 === "" || this.state.password2 === "") {
            this.props.errorHandler("Neither password field may be blank");
            return;
        }
        if (this.state.password1 !== this.state.password2) {
            this.props.errorHandler("The provided passwords do not match");
            return;
        }

        // otherwise, fire away
        this.props.submitHandler(this.state);
    }

    onViewClick(event)
    {
        this.props.onViewClick(LOGIN_VIEW);
    }

    handleUserChangeOrBlur({ target })
    {
        this.setState({
            username: target.value
        });
    }

    handlePass1ChangeOrBlur({ target })
    {
        this.setState({
            password1: target.value
        });
    }

    handlePass2ChangeOrBlur({ target })
    {
        this.setState({
            password2: target.value
        });
    }

    render()
    {
        return (
            <form className="entryForm" onSubmit={this.handleSubmit}>
                <div>
                    <span>Username:</span>
                    <input type='text' 
                           name={USER_INPUT_ID}
                           onChange={this.handleUserChangeOrBlur}
                           onBlur={this.onUserChangeOrBlur}/>
                </div>
                <div>
                    <span>Password:</span>
                    <input type='password' 
                           name={PASS_INPUT_ID1}
                           onChange={this.handlePass1ChangeOrBlur}
                           onBlur={this.handlePass1ChangeOrBlur}/>
                </div>
                <div>
                    <span>Confirm Password:</span>
                    <input type='password' 
                           name={PASS_INPUT_ID2}
                           onChange={this.handlePass2ChangeOrBlur}
                           onBlur={this.handlePass2ChangeOrBlur}/>
                </div>
                <span className='viewLink' onClick={this.onViewClick}>Login</span>
                <button style={{float: "right"}} type='submit'>Register</button>
            </form>
        )
    }
}

RegisterForm.propTypes = {
    submitHandler: PropTypes.func.isRequired,
    onViewClick: PropTypes.func.isRequired
}

export default RegisterForm;
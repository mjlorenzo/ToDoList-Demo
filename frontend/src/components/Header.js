import { Component } from 'react';
import { connect } from 'react-redux';
import React from 'react';
import { logout } from '../actions';

function mapStateToProps(state) {
    return {
        username: state.user.username,
        authToken: state.user.authToken
    };

}

const mapDispatchToProps = {
    logout: logout
}

// This component will display a simple header with a title and username/logout button if applicable
class RRHeader extends Component
{
    // constructor to bind handleClick function to this instance
    constructor(props)
    {
        super(props);

        this.logoutClick = this.logoutClick.bind(this);
    }

    // define the click handler
    logoutClick()
    {
        this.props.logout(this.props.authToken);
    }

    // define render() behavior
    render()
    {
        let userHeading;

        if (this.props.username.length !== 0) {
            userHeading = (
                <span className='userHeading'>
                    <span>{this.props.username}</span>
                    <button onClick={this.logoutClick}>Logout</button>
                </span>
            );
        }
        else {
            userHeading = null;
        }
        return (
            <div className='header'>
                <span className='headerTitle'>To Do List</span>
                {userHeading}
            </div>
        );
    }
}

var Header = connect(mapStateToProps, mapDispatchToProps)(RRHeader);
export default Header;
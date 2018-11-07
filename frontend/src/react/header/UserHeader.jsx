// This file creates a component to display a user's username and a Logout button to log them out

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class UserHeader extends PureComponent
{
    constructor(props)
    {
        super(props);

        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    handleLogoutClick()
    {
        this.props.logout();
    }

    render()
    {
        return (
            <span className='userHeading'>
                <span>{this.props.username}</span>
                <button onClick={this.handleLogoutClick}>Logout</button>
            </span>
        );
    }
}

UserHeader.propTypes = {
    username: PropTypes.string.isRequired,
    logout: PropTypes.func.isRequired
};

export default UserHeader;

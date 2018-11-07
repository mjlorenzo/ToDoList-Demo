import { PureComponent } from 'react';
import React from 'react';
import UserHeaderControl from './UserHeaderControl';
import PropTypes from 'prop-types';

// This component will display a simple header with a title and username/logout button if applicable
class Header extends PureComponent
{
    // define render() behavior
    render()
    {
        let userHeading = this.props.username.length !== 0 ? <UserHeaderControl /> : null;

        return (
            <div className='header'>
                <span className='headerTitle'>To Do List</span>
                {userHeading}
            </div>
        );
    }
}

Header.propTypes = {
    username: PropTypes.string
};

export default Header;
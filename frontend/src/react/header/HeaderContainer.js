// This file contains functions linking the Header component to the redux state

import { userNameSelector } from '../../redux/selectors';
import { connect } from 'react-redux';
import Header from './Header';

function mapStateToProps(state) {
    return {
        username: userNameSelector(state)
    }
}

const HeaderContainer = connect(mapStateToProps)(Header);
export default HeaderContainer;
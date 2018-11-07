import { logout } from './../../redux/actions';
import UserHeader from './UserHeader';
import { connect } from 'react-redux';
import { userNameSelector, authTokenSelector } from '../../redux/selectors';

function mapStateToProps(state) {
    return {
        // [TODO]: Make these selectors
        username: userNameSelector(state),
        authToken: authTokenSelector(state)
    };

}

const mapDispatchToProps = {
    logout: logout
}

const UserHeaderControl = connect(mapStateToProps, mapDispatchToProps)(UserHeader);
export default UserHeaderControl;
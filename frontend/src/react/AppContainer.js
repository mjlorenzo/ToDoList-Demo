import App from './App';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        // [TODO]: Make these selectors
        username: state.user.username,
        error: state.error
    }
}

const AppContainer = connect(mapStateToProps)(App);
export default AppContainer;
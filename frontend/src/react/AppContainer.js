import App from './App';
import { connect } from 'react-redux';
import { userNameSelector, errorSelector } from './../redux/selectors';
import { setError, clearError } from '../redux/actions';

// redux bindings for the top-level application component

const mapDispatchToProps = {
    errorHandler: setError,
    clearError: clearError
};

function mapStateToProps(state) {
    return {
        username: userNameSelector(state),
        error: errorSelector(state)
    }
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
export default AppContainer;
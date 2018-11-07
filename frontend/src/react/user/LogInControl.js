import { connect } from 'react-redux';
import { login, setError } from '../../redux/actions';
import LogInForm from './LogInForm';


// map relevant action creators to properties
const mapDispatchToProps = {
    submitHandler: login,
    errorHandler: setError
}

const LogInControl = connect(null, mapDispatchToProps)(LogInForm);
export default LogInControl;
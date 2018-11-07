import { connect } from 'react-redux';
import { login } from '../../redux/actions';
import LogInForm from './LogInForm';


// map relevant action creators to properties
const mapDispatchToProps = {
    submitHandler: login
}

const LogInControl = connect(null, mapDispatchToProps)(LogInForm);
export default LogInControl;
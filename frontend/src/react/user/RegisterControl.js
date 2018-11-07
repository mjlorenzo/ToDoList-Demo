import { connect } from 'react-redux';
import RegisterForm from './RegisterForm';
import { register, setError } from '../../redux/actions';

const mapDispatchToProps = {
    submitHandler: register,
    errorHandler: setError
}

const RegisterControl = connect(null, mapDispatchToProps)(RegisterForm);
export default RegisterControl;

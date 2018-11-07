import { connect } from 'react-redux';
import RegisterForm from './RegisterForm';
import { register } from '../../redux/actions';

const mapDispatchToProps = {
    submitHandler: register
}

const RegisterControl = connect(null, mapDispatchToProps)(RegisterForm);
export default RegisterControl;

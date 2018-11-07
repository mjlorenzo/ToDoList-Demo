import { submitTodo, setError } from '../../redux/actions';
import { connect } from 'react-redux';
import AddTodoForm from './AddTodoForm';
import { authTokenSelector } from '../../redux/selectors';

const mapDispatchToProps = {
    submitHandler: submitTodo,
    setError: setError
}

function mapStateToProps(state) {
    return {
        authToken: authTokenSelector(state)
    }
}

const AddTodoControl = connect(mapStateToProps, mapDispatchToProps)(AddTodoForm);
export default AddTodoControl;
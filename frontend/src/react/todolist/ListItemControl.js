import { deleteTodo, toggleTodo } from './../../redux/actions';
import { connect } from 'react-redux';
import { ListItem } from './ListItem';
import { authTokenSelector } from '../../redux/selectors';

const mapDispatchToProps = {
    deleteTodo: deleteTodo,
    toggleTodo: toggleTodo
}

function mapStateToProps(state) {
    return {
        authToken: authTokenSelector(state)
    }
}

const ListItemControl = connect(mapStateToProps, mapDispatchToProps)(ListItem);
export default ListItemControl;


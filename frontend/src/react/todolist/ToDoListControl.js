import { fetchTodos, changePage } from '../../redux/actions';
import { connect } from 'react-redux';
import ToDoList from './ToDoList';
import { authTokenSelector, currentPageSelector, 
         lastPageSelector, visibleTodosSelector,
         pageFirstIndexSelector } from '../../redux/selectors';

// make sure we can ask Redux to fetch our list of todos
const mapDispatchToProps = {
    fetchTodos: fetchTodos,
    changePage: changePage
};

// make sure the authentication token and todo list are available to the component
function mapStateToProps(state) {
    return {
        authToken: authTokenSelector(state),
        visibleTodos: visibleTodosSelector(state),
        currentPage: currentPageSelector(state),
        firstIndex: pageFirstIndexSelector(state),
        lastPage: lastPageSelector(state)
    };
}

const ToDoListControl = connect(mapStateToProps, mapDispatchToProps)(ToDoList);
export default ToDoListControl;
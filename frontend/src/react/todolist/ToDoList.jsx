import React, { Component } from "react";
import SortFuncs from '../../redux/sorts';
import AddTodoControl from './AddTodoControl';
import ListItemControl from './ListItemControl';
import SortLinkControl from './SortLinkControl';
import PropTypes from 'prop-types';
import Todo from '../../classes/Todo';
import PageControl from "./PageControl";


// React component that will maintain the to do list
class ToDoList extends Component
{
    // when the component mounts, fetch the todo list
    componentDidMount()
    {
        this.props.fetchTodos(this.props.authToken);
    }

    render()
    {
        // return a new array of <ListItem> components containing each to do item with attendant
        // properties
        return (
            <div>
                <div className='todoContainer'>
                    <div className='tableHeader'>
                        <div className='tableCell'>#</div>
                        <div className='tableCell'>Description</div>
                        <SortLinkControl className='tableCell clickable' sorts={SortFuncs.time} text="Created" />
                        <div className='tableCell'></div>
                    </div>
                    {this.props.visibleTodos.map(
                        (todo, index) => {
                            let realIndex = this.props.firstIndex + index + 1;
                            return (<ListItemControl index={realIndex} key={todo.id} id={todo.id} desc={todo.desc} complete={todo.complete} created={todo.createdString()} />);
                        }
                    )}
                </div>
                <PageControl />
                <AddTodoControl />
            </div>
        );
    }
}

ToDoList.propTypes = {
    fetchTodos: PropTypes.func.isRequired,
    visibleTodos: PropTypes.arrayOf(PropTypes.instanceOf(Todo)).isRequired,
    authToken: PropTypes.string.isRequired
}

export default ToDoList;
import { Component } from "react";
import React from "react";
import SortFuncs from '../../redux/sorts';
import AddTodoControl from './AddTodoControl';
import ListItemControl from './ListItemControl';
import SortLinkControl from './SortLinkControl';
import PropTypes from 'prop-types';
import Todo from '../../classes/Todo';


// React component that will maintain the to do list
class ToDoList extends Component
{
    // bind our event handlers
    constructor(props)
    {
        super(props);

        this.nextClick = this.nextClick.bind(this);
        this.prevClick = this.prevClick.bind(this);
    }
    // when the component mounts, fetch the todo list
    componentDidMount()
    {
        this.props.fetchTodos(this.props.authToken);
    }

    // handlers for clicking the next and previous page buttons
    nextClick(event)
    {
        this.props.changePage(this.props.currentPage + 1);
    }

    prevClick(event)
    {
        this.props.changePage(this.props.currentPage - 1);
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
                <button disabled={this.props.currentPage <= 1} onClick={this.prevClick}>Prev</button>
                <span>{this.props.currentPage + " of " + this.props.lastPage}</span>
                <button disabled={this.props.currentPage >= this.props.lastPage}onClick={this.nextClick}>Next</button>
                <AddTodoControl />
            </div>
        );
    }
}

ToDoList.propTypes = {
    fetchTodos: PropTypes.func.isRequired,
    changePage: PropTypes.func.isRequired,
    visibleTodos: PropTypes.arrayOf(PropTypes.instanceOf(Todo)).isRequired,
    authToken: PropTypes.string.isRequired,
    currentPage: PropTypes.number.isRequired,
    lastPage: PropTypes.number.isRequired,
    firstIndex: PropTypes.number.isRequired
}

export default ToDoList;
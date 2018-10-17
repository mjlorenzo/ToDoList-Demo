import { Component } from "react";
import ListItem from './ListItem';
import { fetchTodos } from '../actions';
import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import AddTodoForm from './AddTodoForm';
import SortFuncs from '../constants/sort_functions';
import SortLink from "./SortLink";

// make sure we can ask Redux to fetch our list of todos
const mapDispatchToProps = {
    fetchTodos: fetchTodos,
}

// make sure the authentication token and todo list are available to the component
function mapStateToProps(state) {
    return { 
        authToken: state.user.authToken,
        todos: state.todos 
    };
}

// React component that will maintain the to do list
class RRToDoList extends Component
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
                        <SortLink className='tableCell' sorts={SortFuncs.time} text="Created" />
                        <div className='tableCell'></div>
                    </div>
                    {this.props.todos.map(
                        (todo, index) => {
                            return (<ListItem index={index + 1} key={todo.id} id={todo.id} desc={todo.desc} complete={todo.complete} created={todo.createdString()} />);
                        }
                    )}
                </div>
                <AddTodoForm />
            </div>
        );
    }
}

var ToDoList = connect(mapStateToProps, mapDispatchToProps)(RRToDoList);
export default ToDoList
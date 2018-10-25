import { Component } from "react";
import ListItem from './ListItem';
import { fetchTodos, changePage } from '../actions';
import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import AddTodoForm from './AddTodoForm';
import SortFuncs from '../constants/sorts';
import SortLink from "./SortLink";
import Page from '../classes/Page';

// make sure we can ask Redux to fetch our list of todos
const mapDispatchToProps = {
    fetchTodos: fetchTodos,
    changePage: changePage
}

// make sure the authentication token and todo list are available to the component
function mapStateToProps(state) {
    return { 
        authToken: state.user.authToken,
        visibleTodos: state.visibleTodos,
        page: state.page,
        totalTodos: state.todos.length
    };
}

// React component that will maintain the to do list
class RRToDoList extends Component
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
        let newPage = new Page(this.props.page.current + 1, this.props.page.itemsPer);
        this.props.changePage(newPage);
    }

    prevClick(event)
    {
        let newPage = new Page(this.props.page.current -1, this.props.page.itemsPer);
        this.props.changePage(newPage);
    }

    render()
    {
        // do a basic calculation for the last page number
        let lastPage = Math.ceil(this.props.totalTodos / this.props.page.itemsPer);
        // return a new array of <ListItem> components containing each to do item with attendant
        // properties
        return (
            <div>
                <div className='todoContainer'>
                    <div className='tableHeader'>
                        <div className='tableCell'>#</div>
                        <div className='tableCell'>Description</div>
                        <SortLink className='tableCell clickable' sorts={SortFuncs.time} text="Created" />
                        <div className='tableCell'></div>
                    </div>
                    {this.props.visibleTodos.map(
                        (todo, index) => {
                            let realIndex = this.props.page.firstIndex + index + 1;
                            return (<ListItem index={realIndex} key={todo.id} id={todo.id} desc={todo.desc} complete={todo.complete} created={todo.createdString()} />);
                        }
                    )}
                </div>
                <button disabled={this.props.page.current <= 1} onClick={this.prevClick}>Prev</button>
                <span>{this.props.page.current + " of " + lastPage}</span>
                <button disabled={this.props.page.current === lastPage}onClick={this.nextClick}>Next</button>
                <AddTodoForm />
            </div>
        );
    }
}

var ToDoList = connect(mapStateToProps, mapDispatchToProps)(RRToDoList);
export default ToDoList
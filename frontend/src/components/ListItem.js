import { Component } from "react";
import React from "react";
import { connect } from 'react-redux';
import { deleteTodo, toggleTodo } from '../actions';

const mapDispatchToProps = {
    deleteTodo: deleteTodo,
    toggleTodo: toggleTodo
}

function mapStateToProps(state) {
    return {
        authToken: state.user.authToken
    }
}

// class representing each todo item in the list
// the user will be able to interact with this component to perform actions on its particular todo
export class RRListItem extends Component
{
    // define constructor to bind event handlers to the current instance
    constructor(props)
    {
        super(props);

        this.deleteClick = this.deleteClick.bind(this);
        this.textClick = this.textClick.bind(this);
    }

    // handler for the delete button
    deleteClick()
    {
        this.props.deleteTodo(this.props.id, this.props.authToken);
    }

    // handler for clicking the description, this will toggle the todo between complete and not
    textClick()
    {
        this.props.toggleTodo(this.props.id, {
            complete: !this.props.complete
        }, this.props.authToken);
    }

    // override the render function
    render()
    {
        let style = {
            textDecorationLine: this.props.complete ? "line-through" : "none"
        }
        return (
            <li>
                <div>
                    <span onClick={this.textClick} style={style}>{this.props.desc}</span>
                    <button onClick={this.deleteClick}>Delete</button>
                </div>
            </li>
        )
    }
}

var ListItem = connect(mapStateToProps, mapDispatchToProps)(RRListItem);
export default ListItem;
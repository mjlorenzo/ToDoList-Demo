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
            <div className='tableRow'>
                <div className='tableCell'>{this.props.index}</div>
                <div onClick={this.textClick} className='tableCell clickable' style={style}>{this.props.desc}</div>
                <div className='tableCell'>{this.props.created}</div>
                <button className='tableCell clickable' onClick={this.deleteClick}>Delete</button>
            </div>
        )
    }
}

var ListItem = connect(mapStateToProps, mapDispatchToProps)(RRListItem);
export default ListItem;
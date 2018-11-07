import { Component } from "react";
import React from "react";
import PropTypes from 'prop-types';

// class representing each todo item in the list
// the user will be able to interact with this component to perform actions on its particular todo
export class ListItem extends Component
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

ListItem.propTypes = {
    authToken: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    desc: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    toggleTodo: PropTypes.func.isRequired
};

export default ListItem;
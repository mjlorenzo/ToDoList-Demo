import { Component } from "react";
import { ListItem } from '../components/ListItem'
import React from "react";
import ReactDOM from "react-dom";

// React component describing each indvidiual todo item in the lsit
export class ToDoList extends Component
{
    render()
    {
        // return a new array of <ListItem> components containing each to do item
        // for simplicity, right now only the description of the to do is displayed
        return (
            <ul>
                {this.props.todos.map(
                    (todo) => {
                        return (<ListItem key={todo.id} />);
                    }
                )}
            </ul>
        );
    }
}
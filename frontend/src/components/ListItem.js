import { Component } from "react";
import React from "react";
import ReactDOM from "react-dom";

// class defining the UI element of a to do list item
export class ListItem extends Component
{
    // override the render function
    // right now only creates a list item with the todo's description
    render()
    {
        return (
            <li>
                {this.props.desc}
            </li>
        )
    }
}
import { Component } from "react";
import LogInForm from './LogInForm';
import ToDoList from './ToDoList';
import Header from './Header';
import React from 'react';
import { connect } from 'react-redux';


function mapStateToProps(state) {
    return {
        username: state.user.username
    }
}

// class defining the container component for the entire To Do List application
class RRApp extends Component
{

    // override the render method from react
    render()
    {
        let component;
        if (this.props.username.length !== 0)
            component = <ToDoList />;
        else
            component = <LogInForm />;

        return (
            <span>
                <Header />
                <div className="main">
                    {component}
                </div>                    
            </span>
        );
    }
}

// Fire off connect() to tie the component to Redux
const App = connect(mapStateToProps)(RRApp);
export default App;
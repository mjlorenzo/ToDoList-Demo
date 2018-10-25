import { Component } from "react";
import LogInForm from './LogInForm';
import ToDoList from './ToDoList';
import RegisterForm from './RegisterForm';
import Header from './Header';
import React from 'react';
import { connect } from 'react-redux';

export const LOGIN_VIEW = "login";
export const REGISTER_VIEW = "register";

function mapStateToProps(state) {
    return {
        username: state.user.username,
        error: state.error
    }
}

// class defining the container component for the entire To Do List application
class RRApp extends Component
{
    constructor(props)
    {
        super(props);

        // set intitial state
        this.state = {
            view: LOGIN_VIEW
        };

        // bind the onViewClick handler to the current instance
        this.onViewClick = this.onViewClick.bind(this);
    }

    // onViewClick is a click handler that will be passed down to the LogInForm and RegisterForm
    // components. This will allow them to modify the App component's "state.view" from within
    // themselves, specifying which view to display
    // [QUESTION]: This seems fairly reasonable but is it best practice?
    onViewClick(view)
    {
        // basic validation to ensure a valid view was specified
        if (view !== LOGIN_VIEW && view != REGISTER_VIEW)
            throw new Error("Invalid view specified");
        // calling this.setState() within this function will trigger a rerender
        this.setState({
            view: view
        });
    }

    // override the render method from react
    render()
    {
        // determine which component to render
        let component;
        if (this.props.username.length !== 0)
            component = <ToDoList />;
        else if (this.state.view === REGISTER_VIEW)
            component = <RegisterForm onViewClick={this.onViewClick}/>;
        else
            component = <LogInForm onViewClick={this.onViewClick}/>;

        return (
            <span>
                <Header />
                <div className="main">
                    {this.props.error != "" && <div className="error">
                        {"ERROR: " + this.props.error}
                    </div>}
                    {component}
                </div>                    
            </span>
        );
    }
}

// Fire off connect() to tie the component to Redux but wrap in 'withRouter' to ensure the components
// are properly updated
const App = connect(mapStateToProps)(RRApp);
export default App;
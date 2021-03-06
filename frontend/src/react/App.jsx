import React, { Component } from "react";
import LogInControl from './user/LogInControl';
import ToDoListControl from './todolist/ToDoListControl';
import RegisterControl from './user/RegisterControl';
import HeaderContainer from './header/HeaderContainer';
import PropTypes from 'prop-types';

export const LOGIN_VIEW = "login";
export const REGISTER_VIEW = "register";

// class defining the container component for the entire To Do List application
class App extends Component
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
        if (view !== LOGIN_VIEW && view != REGISTER_VIEW) {
            this.props.errorHandler("Invalid view specified");
            return;
        }

        // clear any current errors
        this.props.clearError();
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
            component = <ToDoListControl />;
        else if (this.state.view === REGISTER_VIEW)
            component = <RegisterControl onViewClick={this.onViewClick}/>;
        else
            component = <LogInControl onViewClick={this.onViewClick}/>;

        return (
            <span>
                <HeaderContainer />
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

App.propTypes = {
    username: PropTypes.string,
    error: PropTypes.string,
    errorHandler: PropTypes.func.isRequired,
    clearError: PropTypes.func.isRequired
}

export default App;
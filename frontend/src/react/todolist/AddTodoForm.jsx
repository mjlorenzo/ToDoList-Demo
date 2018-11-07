import React from 'react';
import { Component } from 'react';
import Todo from './../../classes/Todo';
import PropTypes from 'prop-types';

// this component will render a form to add a to do to the list and submit a request
// to the server

class AddTodoForm extends Component
{
    constructor(props)
    {
        super(props);
        
        // bind the handlers to the current instance
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeOrBlur = this.handleChangeOrBlur.bind(this);

        this.state = {
            desc: ""
        };
    }

    handleSubmit(event)
    {
        // halt the browser
        event.preventDefault();

        // [TODO]: validate input
        // create a new Todo (the ID value is meaningless to the API)
        var newTodo = new Todo(0, this.state.desc, false);

        // call the action creator to make the network request
        this.props.submitHandler(newTodo, this.props.authToken);
    }

    handleChangeOrBlur({ target })
    {
        this.setState({
            desc: target.value
        });
    }

    render()
    {
        return (
            <div>
                <form>
                    <input name='desc' 
                           type='text' 
                           size='50' 
                           maxLength='50'
                           onChange={this.handleChangeOrBlur}
                           onBlur={this.handleChangeOrBlur}/>
                    <button type='submit' onClick={this.handleSubmit}>Add ToDo</button>
                </form>
            </div>
        );
    }
}

AddTodoForm.propTypes = {
    authToken: PropTypes.string.isRequired,
    submitHandler: PropTypes.func.isRequired
};

export default AddTodoForm;
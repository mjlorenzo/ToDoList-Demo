import React from 'react';
import { Component } from 'react';
import { submitTodo } from './../actions';
import { connect } from 'react-redux';

const ADDTODO_FORM_ID = "ADDTODO_FORM";
const TODO_INPUT_ID = "TODO_INPUT";

const mapDispatchToProps = {
    submitTodo: submitTodo
}

function mapStateToProps(state) {
    return {
        csrfToken: state.csrfToken,
        authToken: state.user.authToken
    }
}

// this component will render a form to add a to do to the list and submit a request
// to the server

class RRAddTodoForm extends Component
{
    constructor(props)
    {
        super(props);
        
        // bind the submit handler to the current instance
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event)
    {
        // halt the browser
        event.preventDefault();

        // retrieve the form element
        var form = document.getElementById(ADDTODO_FORM_ID);
        // create the FormData object from the form element
        var formData = new FormData(form);
        // append a false for completed
        formData.append("complete", "false");

        // call the action creator to make the network request
        this.props.submitTodo(formData, this.props.authToken, this.props.csrfToken);
        // reset the form on submit
        form.reset();
    }

    render()
    {
        return (
            <div>
                <form id={ADDTODO_FORM_ID}>
                    <input id={TODO_INPUT_ID} name='desc' type='text' size='50' maxLength='50'/>
                    <button type='submit' onClick={this.handleSubmit}>Add ToDo</button>
                </form>
            </div>
        );
    }
}

var AddTodoForm = connect(mapStateToProps, mapDispatchToProps)(RRAddTodoForm);
export default AddTodoForm;
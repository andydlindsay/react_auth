import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class Signin extends Component {

    handleFormSubmit({ email, password }) {
        console.log(email, password);
        // need to log user in

    }

    renderField(field) {
        return (
            <div>
                <label>{field.label}</label>
                <input
                    className='form-control'
                    type='text'
                    {...field.input}
                />
            </div>
        );
    }

    render() {
        const { handleSubmit} = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <Field
                    label='Email:'
                    name='email'
                    component={this.renderField}
                />
                <Field
                    label='Password:'
                    name='password'
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Sign In</button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'signin'
})(Signin);

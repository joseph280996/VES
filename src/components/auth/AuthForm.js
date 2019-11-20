import React from 'react';
import {connect} from 'react-redux';
import {Fields, reduxForm} from 'redux-form';
import { Grid, Typography, Button } from '@material-ui/core';

class AuthForm extends React.Component {
    render(){
        return (
            <form onSubmit={this.props.handleSubmit(this.props.onFormSubmit)}>
                <Grid container direction="column" spacing={2}>
                    <Grid item><Typography variant="h3">{this.props.title}</Typography></Grid>
                    <Grid item><Fields names={this.props.fieldNames} component={this.props.renderFields}></Fields></Grid>
                    <Grid item><Button type="submit">{this.props.btnText}</Button></Grid>
                </Grid>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
    }
}

const validate = (formValues) => {
    const errors = {};

    if(!formValues.email){
        errors.email = "You Must Enter An Email";
    }
    if(!formValues.password){
        errors.password = "You Must Enter a Password";
    }
    if(!formValues.passwordOne) {
        errors.passwordOne = "You Must Enter a Password";
    }
    if(formValues.passwordTwo !== formValues.passwordOne) {
        errors.passwordTwo = "The password you enter is not match";
    }

    return errors;
}

export default connect(mapStateToProps)(reduxForm({
    form: 'authForm',
    validate,
})(AuthForm));
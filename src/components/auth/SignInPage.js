import React from 'react';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import AuthForm from './AuthForm';
import {connect} from 'react-redux';
import { signIn } from '../../action';

import { TextField, Grid, Paper, CircularProgress } from '@material-ui/core';

const isInvalid = ({touched, error}) => {
    return (touched && error)? true: false;
}

const renderError = (meta) => {
    if(this.isInvalid(meta)) {
        return meta.error;
    }
}

const LOG_IN = gql`
    mutation LogIn($email: String!, $password: String!){
        logIn(
            email: $email,
            password: $password
            ){
                token
                _id
                email
            }
    }
`

const renderFields = (fields) => {
    return (
        <Grid container spacing={2} >
            <Grid item>
                <TextField
                type="text"
                {...fields.email.input}
                error={isInvalid(fields.email.meta)}
                helperText={renderError(fields.email.meta)}
                label="Email" 
                variant="outlined"
                required/>
            </Grid>
            <Grid item>
                <TextField
                type="password"
                {...fields.password.input}
                error={isInvalid(fields.password.meta)}
                helperText={renderError(fields.password.meta)}
                label="Password" 
                variant="outlined"
                required/>
            </Grid>
        </Grid>
    )
}

const SignIn = (props) => {
    const {auth} = props;
    const [logIn, {data}] = useMutation(LOG_IN);
    if(!auth) return <CircularProgress/>
    if(auth.isSignedIn){
        return (
            <Paper>
                You have logged In!
            </Paper>
        );
    }
    const onSubmit = (formValues) => {
        logIn({
            variables: {
                email: formValues.email,
                password: formValues.password,
            }
        }).then(data => {
            signIn(data);
        });
    }
    return (
        <Paper>
            <AuthForm
            title="Sign In"
            onFormSubmit={onSubmit}
            fieldNames={['email', 'password']}
            btnText="Sign In"
            renderFields={renderFields}/>
        </Paper>
    );

}

const mapStateToProps = state => {
    return {
        auth: state.auth,
    };
}

export default connect(mapStateToProps, {signIn})(SignIn);
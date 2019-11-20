import React from 'react';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import {Link} from 'react-router-dom';
import AuthForm from './AuthForm';
import {connect} from 'react-redux';
import history from '../history';


import { TextField, Grid, Paper, CircularProgress } from '@material-ui/core';

const isInvalid = ({touched, error}) => {
    return (touched && error)? true: false;
}

const renderError = (meta) => {
    if(this.isInvalid(meta)) {
        return meta.error;
    }
}

const CREATE_USER = gql`
    mutation CreateUser($name: String!, $email: String!, $password: String!){
        createUser(input: {
            email: $email,
            name: $name,
            password: $password
        }){
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
                type="text"
                {...fields.name.input}
                error={isInvalid(fields.name.meta)}
                helperText={renderError(fields.name.meta)}
                label="Name" 
                variant="outlined"
                required/>
            </Grid>
            <Grid item>
                <TextField
                type="password"
                {...fields.passwordOne.input}
                error={isInvalid(fields.passwordOne.meta)}
                helperText={renderError(fields.passwordOne.meta)}
                label="Password" 
                variant="outlined"
                required/>
            </Grid>
            <Grid item>
                <TextField
                type="password"
                {...fields.passwordTwo.input}
                error={isInvalid(fields.passwordTwo.meta)}
                helperText={renderError(fields.passwordTwo.meta)}
                label="Confirm Your Password" 
                variant="outlined"
                required/>
            </Grid>
        </Grid>
    )
}

const SignUp = (props) => {
    const {auth} = props;
    const [createUser] = useMutation(CREATE_USER);
    if(!auth) return <CircularProgress/>
    if(auth.isSignedIn){
        return (
            <Paper>
                You have logged In, please head over to <Link to="/">Home page</Link>
            </Paper>
        );
    }
    const onSubmit = (formValues) => {
        createUser({
            variables: {
                email: formValues.email,
                password: formValues.passwordOne,
                name: formValues.name,
            }
        }).then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err);
        });
    }
    return (
        <Paper>
            <AuthForm
            title="Sign Up"
            onFormSubmit={onSubmit}
            fieldNames={['name', 'email', 'passwordOne', 'passwordTwo']}
            btnText="SignUp"
            renderFields={renderFields}/>
        </Paper>
    );

}

const mapStateToProps = state => {
    return {
        auth: state.auth,
    };
}

export default connect(mapStateToProps)(SignUp);
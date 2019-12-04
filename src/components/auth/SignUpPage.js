import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import AuthForm from './AuthForm';
import history from '../history';

import { makeStyles } from '@material-ui/core/styles';
import { TextField, Grid, Paper, CircularProgress, Typography, Button } from '@material-ui/core';

const useStyle = makeStyles({
    container: {
        margin: '5vh auto',
        width: '50vh',
        padding: '2vh'
    }
})

const isInvalid = ({ touched, error }) => {
    return (touched && error) ? true : false;
}

const renderError = (meta) => {
    if (isInvalid(meta)) {
        return meta.error;
    }
}

const CREATE_USER = gql`
    mutation CreateUser($email: String!){
        createUser(input: {
            email: $email,
        }){
            isEmailVerified
        }
    }
`

const renderFields = ({ input, meta }) => {
    return (
        <Grid container spacing={2} >
            <Grid item>
                <TextField
                    type="text"
                    {...input}
                    error={isInvalid(meta)}
                    helperText={renderError(meta)}
                    label="Email"
                    variant="outlined"
                    required />
            </Grid>
        </Grid>
    )
}


const SignUp = (props) => {
    const classes = useStyle();
    const [createUser] = useMutation(CREATE_USER);
    const [pageNumber, setPageNumber] = React.useState(1);
    const [message, setMessage] = React.useState('');
    const [isEmailVerified, setIsEmailVerified] = React.useState(false);
    const [isSubmitAuth, setIsSubmitAuth] = React.useState(false);

    React.useEffect(() => {
        if (!isSubmitAuth && !isEmailVerified) {
            setPageNumber(1);
        } else if (!isEmailVerified) {
            setPageNumber(2);
        } else history.push('/');
    }, [isSubmitAuth, isEmailVerified])
    const renderPage = (pageNumber) => {
        switch (pageNumber) {
            case 1:
                return (<AuthForm
                    title="Sign Up"
                    onFormSubmit={onSubmit}
                    btnText="Sign Up"
                    renderFields={renderFields} />)
            case 2:
                return (
                    <Paper className={classes.container}>
                        <Typography>We have sent you an email with a confirmation link.</Typography>
                        <Button>Resend Verification Link</Button>
                    </Paper>
                )
            default:
                return (<AuthForm
                    title="Sign Up"
                    onFormSubmit={onSubmit}
                    btnText="Sign Up"
                    renderFields={renderFields} />)
        }
    }
    const onSubmit = (formValues) => {
        createUser({
            variables: {
                email: formValues.email,
            }
        }).then(response => {
            setIsSubmitAuth(true);
            setIsEmailVerified(response.data.createUser.isEmailVerified);
            setMessage('');
        }).catch(err => {
            setMessage(err.message);
        });
    }
    return (
        <Paper>
            {message && <Typography>{message}</Typography>}
            {renderPage(pageNumber)}
        </Paper>
    );

}
export default SignUp;
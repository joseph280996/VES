import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';

import { CircularProgress, Paper, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import history from '../history';

const useStyle = makeStyles({
    container: {
        margin: '5vh auto',
        width: '50vh',
        padding: '2vh'
    }
})

const VERIFY_USER = gql`
    mutation VerifyUser($hashedValue: String!){
        verify(hashedValue: $hashedValue){
            token
        }
    }
`

const ConfirmationPage = (props) => {
    const classes = useStyle();
    const id = props.match.params.id;
    const [verifyUser] = useMutation(VERIFY_USER);
    const [isSignedIn, setIsSignedIn] = React.useState(null);
    const [message, setMessage] = React.useState(null);
    React.useEffect(() => {
        verifyUser({
            variables: {
                hashedValue: id
            }
        }).then(response => {
            localStorage.setItem("token", response.data.verify.token);
            setIsSignedIn(true);
        }).catch(err => {
            setMessage(err.message)
        });
    }, []);
    return (
        <Paper className={classes.container}>
            <Typography>You Have Successfully Verified Your Account. Refresh the Page</Typography>
            <Button><Link to="/">Main Page</Link></Button>
        </Paper>
    );
}

export default ConfirmationPage
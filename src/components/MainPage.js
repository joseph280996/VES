import React from 'react';
import { Link } from 'react-router-dom';
import history from './history';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { Typography, Button } from '@material-ui/core';

const SIGN_IN = gql`
mutation {
    login{
        isSignedIn
    }
}
`;

const MainPage = (props) => {
    const [signIn] = useMutation(SIGN_IN);
    const [isSignedIn, setIsSignedIn] = React.useState(false);
    const [message, setMessage] = React.useState(false);

    React.useEffect(() => {
        signIn().then(response => {
            setIsSignedIn(response.data.login.isSignedIn);
        }).catch(e => setMessage(e.message));
    }, [isSignedIn]);
    const renderText = () => {
        if (!isSignedIn) return <Typography>Not Signed In</Typography>
        else return <Typography>Welcome! End of Authentication</Typography>
    }
    return (
        <div>
            {renderText()}
            {!isSignedIn && <Button><Link to="/signup">Sign In</Link></Button>}
        </div>)
}

export default MainPage;
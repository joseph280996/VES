import React from 'react';
import history from './history';
import { Router, Route, Switch } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
// import SignInPage from './auth/SignInPage';
import SignUpPage from './auth/SignUpPage';
import ConfirmationPage from './auth/ConfirmationPage';
import MainPage from './MainPage';

function App() {
  return (
    <div>
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={MainPage} />
          {/* <Route path="/signin" exact component={SignInPage} /> */}
          <Route path="/signup" exact component={SignUpPage} />
          <Route path="/user/:id" exact component={ConfirmationPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

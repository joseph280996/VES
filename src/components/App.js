import React from 'react';
import history from './history';
import {Router, Route, Switch} from 'react-router-dom';
import SignInPage from './auth/SignInPage';
import SignUpPage from './auth/SignUpPage'

function App() {
  return (
    <div>
      <Router history={history}>
        <Switch>
          <Route path="/signin" exact componen={SignInPage}/>
          <Route path="/signup" exact componen={SignUpPage}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

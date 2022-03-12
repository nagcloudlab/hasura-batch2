import React from 'react';
import { Container } from '@material-ui/core';
import { Link, Route, Switch } from 'react-router-dom';
import SignUp from './components/signup/SignUp'
import SignIn from './components/signin/SignIn';
import { UserProfile } from './components/user-profile/UserProfile';

function App() {
  return (
    <div className="">
      <Container maxWidth="md">
        <ul className="nav nav-pills">
          <li className="nav-item">
            <Link className="nav-link" to="/signup">Sign-up</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/signin">Sign-in</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/profile/:id" component={UserProfile} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;

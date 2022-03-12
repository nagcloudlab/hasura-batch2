import React, { useContext } from 'react';
import './App.css';
import SignUp from './components/signup/SignUp'

import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
} from "react-router-dom";
import SignIn from './components/signin/SignIn';
import { UserProfile } from './components/user-profile/UserProfile';
import { AuthProvider, ProtectedRoute } from './components/auth/AuthContext';
import { ApolloProvider } from '@apollo/client';
import { Container } from '@material-ui/core';
import { authContext } from "./components/auth/AuthContext";


function App() {
  const context = useContext(authContext);
  console.log(context)
  return (
    <Container maxWidth="md">
      <hr />
      <ul className="nav nav-pills">
        <li className="nav-item">
          <Link className="nav-link" to="/signup">Sign-up</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/signin">Sign-in</Link>
        </li>
      </ul>
      <hr />
      <Switch>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <ProtectedRoute path="/profile/:id">
          <UserProfile />
        </ProtectedRoute>
      </Switch>
    </Container>
  );
}

export default App;

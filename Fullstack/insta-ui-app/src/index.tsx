import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  GraphQLRequest,
  InMemoryCache
} from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { setContext } from "@apollo/client/link/context";

const authLink = setContext(
  ({ operationName }: GraphQLRequest, prevCtx: any) => {
    const publicOperations = ["signin", "signup"];
    if (
      operationName &&
      !publicOperations.includes(operationName.toLowerCase())
    ) {
      const token = localStorage.getItem("user_token");
      return {
        headers: {
          ...prevCtx.headers,
          Authorization: `Bearer ${token}`,  // 
        },
      };
    }
  }
);

const httpLink = createHttpLink({
  uri: "http://localhost:8080/v1/graphql",
});

// graphQL client
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

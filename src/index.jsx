import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloProvider, ApolloClient, HttpLink, InMemoryCache,
} from '@apollo/client';
import { setContext } from 'apollo-link-context';
import App from './App';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('shed-app-user-token');
  // console.log(token !== 'undefined' || 'null');
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    },
  };
});

const httpLink = new HttpLink({
  uri: 'https://shed-app-api.herokuapp.com/graphql',
  credentials: 'include',
});

const client = new ApolloClient({
  credentials: 'include',
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);

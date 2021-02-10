import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client';
import { setContext } from 'apollo-link-context';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('shed-app-user-token')
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    }
  }
})

const httpLink = new HttpLink({
  uri: 'http://localhost:4000'
})

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
})


ReactDOM.render(
    <ApolloProvider client={client}> 
        <App />
    </ApolloProvider>,
document.getElementById('root'));
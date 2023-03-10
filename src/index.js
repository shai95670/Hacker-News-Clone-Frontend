import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import { setContext } from '@apollo/client/link/context';
import { ApolloProvider,ApolloClient,HttpLink,InMemoryCache } from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
});

const authLink = setContext((_, { headers }) => {
  const apiKey = localStorage.getItem('apiKey');
  return {
    headers: {
      ...headers,
      authorization: apiKey ? `Bearer ${apiKey}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
      <App/>
  </ApolloProvider>
);

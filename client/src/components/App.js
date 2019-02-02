import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { uri } from '../private';
import BookList from './BookList';
import AddBook from './AddBook';

// Apollo client setup
const client = new ApolloClient({
  uri: uri.local
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client} >
        <div id='main'>
          <h1>Suggested Reading List</h1>
          <BookList />
          <AddBook />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;

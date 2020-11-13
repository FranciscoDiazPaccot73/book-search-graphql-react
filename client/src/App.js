import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// components
import BookList from './components/BookList/BookList';
import AddBook from './components/AddBook/AddBook';

import './App.scss';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="main-class">
        <BookList />
      </div>
    </ApolloProvider>
  );
}

export default App;
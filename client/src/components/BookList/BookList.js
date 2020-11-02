import React, { useState } from 'react';
import { graphql } from 'react-apollo';

import { getBooksQry } from '../../utils/queries/queries';

import BookDetails from '../BookDetails/BookDetails';

const BookList = ({ data }) => {
  const { loading, books, ...rest } = data;
  const [selectedBook, selectBook] = useState(null);
  
  const displayBooks = () => (
    books.map(book => (
      <li key={book.id} onClick={() => selectBook(book.id)}>{book.name}</li>)
    )
  );

  const emptyState = () => (
    <div>Loading...</div>
  );

  return(
    <div>
      <ul id="book-list">
        {loading ? emptyState() : displayBooks()}
      </ul>
      <BookDetails selectedBook={selectedBook} />
    </div>
  );
}

export default graphql(getBooksQry)(BookList);

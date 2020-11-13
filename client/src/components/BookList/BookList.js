import React, { useState } from 'react';
import { graphql } from 'react-apollo';

import { getBooksQry } from '../../utils/queries/queries';

import BookDetails from '../BookDetails/BookDetails';
import EmptyState from './EmptyState';
import DisplayBooks from './DisplayBooks';
import AddBook from '../AddBook/AddBook';

import './styles/index.scss';

const BookList = ({ data }) => {
  const { loading, books, ...rest } = data;
  const [selectedBook, selectBook] = useState(null);
  const [showAddBook, setAddBook] = useState(false);
  
  const handleSelectBook = (value) => {
    if (value === selectedBook) selectBook(null);
    else selectBook(value);
  }

  const handleAddClick = () => {
    setAddBook(!showAddBook);
  }

  return(
    <div className="book">
      <div className="book-container__left">
        <div className="book__add-button" onClick={handleAddClick}>{showAddBook ? 'Close' : 'Add Book'}</div>
        <h1>My Reading List</h1>
        <ul id="book-list" className="book-list">
          {loading ? <EmptyState /> : <DisplayBooks selectedBook={selectedBook} books={books} selectBook={handleSelectBook} />}
        </ul>
      </div>
      <BookDetails selectedBook={selectedBook} selectBook={handleSelectBook} />
      <AddBook showAddBook={showAddBook} />
    </div>
  );
}

export default graphql(getBooksQry)(BookList);

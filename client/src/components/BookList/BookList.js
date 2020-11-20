import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import className from 'classname';

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
  const [shouldReset, setReset] = useState(true);

  const buttonClasses = className('book__add-button', {
    'book__add-button--opened': showAddBook,
  });
  
  const handleSelectBook = (value) => {
    if (value === selectedBook) selectBook(null);
    else selectBook(value);
  }

  const handleAddClick = () => {
    setAddBook(!showAddBook);
    setReset(!shouldReset);
  }

  return(
    <div className="book">
      <div className="book-container__left">
        <div className={buttonClasses} onClick={handleAddClick}>{showAddBook ? 'Close' : 'Add Book'}</div>
        <h1>My Reading List</h1>
        <ul id="book-list" className="book-list">
          {loading ? <EmptyState /> : <DisplayBooks selectedBook={selectedBook} books={books} selectBook={handleSelectBook} />}
        </ul>
      </div>
      <BookDetails selectedBook={selectedBook} selectBook={handleSelectBook} />
      <AddBook showAddBook={showAddBook} reset={shouldReset} />
    </div>
  );
}

export default graphql(getBooksQry)(BookList);

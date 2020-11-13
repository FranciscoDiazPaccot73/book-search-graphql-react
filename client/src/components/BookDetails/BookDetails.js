import React from 'react';
import { graphql } from 'react-apollo';
import { getBookQry } from '../../utils/queries/queries';
import className from 'classname';

import './styles/index.scss';

const BookDetails = ({ selectedBook, data, selectBook }) => {
  const { book } = data;
  const bookClasses = className('book-details', {
    'book-details--opened': selectedBook && book,
  });
  const contentClasses = className('book-details__content', {
    'book-details__content--opened': selectedBook && book,
  });

  const handleSelectBook = (value) => {
    if (selectedBook !== value) selectBook(value);
  }
  
  return(
    <div id="book-details" className={bookClasses}>
      {book &&
        <div className={contentClasses}>
          <h2>{book && book.name}</h2>
          <p>Genre: <span>{book.genre}</span></p>
          <p>Author: <span>{book.author && book.author.name}</span></p>
          <p className="book-details__books-by-author">All boks by this author</p>
          <ul>
            {
              book.author && book.author.books &&
              book.author.books.map(item => (
                <li key={item.id} onClick={() => handleSelectBook(item.id)}>{item.name}</li>
              ))
            }
          </ul>
        </div>
      }
      <div className="book-details__close" onClick={() => selectBook(null)}>Close</div>
    </div>
  );
};

export default graphql(getBookQry, {
  options: (props) => {
    return {
      variables: {
        id: props.selectedBook
      }
    }
  }
})(BookDetails);

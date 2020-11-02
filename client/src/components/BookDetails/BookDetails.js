import React from 'react';
import { graphql } from 'react-apollo';
import { getBookQry } from '../../utils/queries/queries';

const BookDetails = ({ selectedBook, data }) => {
  const { book } = data;

  const displayBooks = () => (
    <div>
      <h2>{book.name}</h2>
      <p>{book.genre}</p>
      <p>{book.author && book.author.name}</p>
      <p>All boks by this author</p>
      <ul>
        {
          book.author && book.author.books &&
          book.author.books.map(item => (
            <li key={item.id}>{item.name}</li>
          ))
        }
      </ul>
    </div>
  )

  const renderEmptyState = () => (
    <div>No book selected...</div>
  )
  
  return(
    <div id="book-details">
      {book ? displayBooks() : renderEmptyState()}
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

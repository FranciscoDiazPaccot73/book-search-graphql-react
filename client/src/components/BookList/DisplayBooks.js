import React from 'react';
import className from 'classname';

const DisplayBooks = ({ books, selectBook, selectedBook }) => (
  books.map(book => (
    <li
      key={book.id}
      onClick={() => selectBook(book.id)}
      className={selectedBook === book.id ? 'selected' : ''}
    >
      {book.name}
    </li>)
  )
);

export default DisplayBooks;

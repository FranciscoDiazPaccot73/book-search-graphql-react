import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import {flowRight as compose} from 'lodash';
import className from 'classname';

import { getAuthorsQry, addBookMutation, getBooksQry } from '../../utils/queries/queries';

import './styles/index.scss';

const AddBook = ({ getAuthors, addBook, showAddBook }) => {
  const { loading, authors } = getAuthors;
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthor] = useState('');
  const addBookClasses = className('add-book', {
    'add-book__open': showAddBook,
  });

  const displayAuthors = () => (
    authors.map(author => <option key={ author.id } value={author.id}>{ author.name }</option> )
  );

  const emptyState = () => (
    <option disabled>Loading authors</option>
  );

  const submitForm = e => {
    e.preventDefault();
    const data = {name, genre, authorId}
    addBook({
      variables: data,
      refetchQueries: [{ query: getBooksQry }]
    });
  }

  return(
    <form id="add-book" className={addBookClasses} onSubmit={submitForm}>
      <div className="field">
          <div className="add-book__label">Book name:</div>
          <input type="text" onChange={e => setName(e.target.value)} />
      </div>
      <div className="field">
          <div className="add-book__label">Genre:</div>
          <input type="text" onChange={e => setGenre(e.target.value)} />
      </div>
      <div className="field">
          <div className="add-book__label">Author:</div>
          <select onChange={e => setAuthor(e.target.value)}>
              <option>Select author</option>
              {loading ? emptyState() : displayAuthors()}
          </select>
      </div>
      <div className="add-book__button">Add Book</div>
    </form>
  )
}

export default compose(
  graphql(getAuthorsQry, { name: "getAuthors" }),
  graphql(addBookMutation, { name: "addBook" })
)(AddBook);

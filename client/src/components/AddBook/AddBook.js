import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import {flowRight as compose} from 'lodash';

import { getAuthorsQry, addBookMutation, getBooksQry } from '../../utils/queries/queries';

const AddBook = ({ getAuthors, addBook }) => {
  const { loading, authors } = getAuthors;
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthor] = useState('');

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
    <form id="add-book" onSubmit={submitForm}>
      <div className="field">
          <label>Book name:</label>
          <input type="text" onChange={e => setName(e.target.value)} />
      </div>
      <div className="field">
          <label>Genre:</label>
          <input type="text" onChange={e => setGenre(e.target.value)} />
      </div>
      <div className="field">
          <label>Author:</label>
          <select onChange={e => setAuthor(e.target.value)}>
              <option>Select author</option>
              {loading ? emptyState() : displayAuthors()}
          </select>
      </div>
      <button>+</button>
    </form>
  )
}

export default compose(
  graphql(getAuthorsQry, { name: "getAuthors" }),
  graphql(addBookMutation, { name: "addBook" })
)(AddBook);

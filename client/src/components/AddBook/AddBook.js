import React, { useState, useEffect } from 'react';
import { graphql } from 'react-apollo';
import {flowRight as compose} from 'lodash';
import className from 'classname';

import { getAuthorsQry, addBookMutation, getBooksQry } from '../../utils/queries/queries';

import './styles/index.scss';

const AddBook = ({ getAuthors, addBook, showAddBook, reset }) => {
  const { loading, authors } = getAuthors;
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthor] = useState('0');
  const [canSend, setCanSend] = useState(false);
  const addBookClasses = className('add-book', {
    'add-book__open': showAddBook,
  });
  const buttonClasses = className('add-book__button', {
    'add-book__button--disabled': !canSend,
  })

  useEffect( () => {
    if ( name !== '' && genre !== '' && authorId !== '' && authorId !== '0') {
      setCanSend(true)
    } else {
      setCanSend(false)
    }

    if (reset) resetValues();

  }, [authorId, genre, name, reset]);

  const resetValues = () => {
    setName('');
    setAuthor('0');
    setGenre('');
  }

  const displayAuthors = () => (
    authors.map(author => <option key={ author.id } value={author.id}>{ author.name }</option> )
  );

  const emptyState = () => (
    <option disabled>Loading authors</option>
  );

  const handleChange = (field, value) => {
    switch (field) {
      case 'Book':
        setName(value);
        break;
      case 'Genre':
        setGenre(value);
        break;
      case 'Author':
        setAuthor(value);
        break
      default:
        break;
    }
  }

  const submitForm = e => {
    if (!canSend) return;
    e.preventDefault();
    const data = {name, genre, authorId}
    addBook({
      variables: data,
      refetchQueries: [{ query: getBooksQry }]
    });
    resetValues();
  }

   return(
    <form id="add-book" className={addBookClasses}>
      <div className="field">
          <div className="add-book__label">Book name:</div>
          <input type="text" value={name} onChange={e => handleChange('Book', e.target.value)} />
      </div>
      <div className="field">
          <div className="add-book__label">Genre:</div>
          <input type="text" value={genre} onChange={e => handleChange('Genre', e.target.value)} />
      </div>
      <div className="field">
          <div className="add-book__label">Author:</div>
          <select value={authorId} onChange={e => handleChange('Author', e.target.value)}>
              <option value='0' >Select author</option>
              {loading ? emptyState() : displayAuthors()}
          </select>
      </div>
      <div className={buttonClasses} onClick={submitForm}>Add Book</div>
    </form>
  )
}

export default compose(
  graphql(getAuthorsQry, { name: "getAuthors" }),
  graphql(addBookMutation, { name: "addBook" })
)(AddBook);

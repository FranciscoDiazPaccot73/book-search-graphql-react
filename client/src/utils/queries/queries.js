import { gql } from 'apollo-boost';

// GET
const getAuthorsQry = gql`
  {
    authors{
      name
      id
    }
  }
`
const getBooksQry = gql`
  {
    books{
      name
      id
    }
  }
`

//QUERIES
const getBookQry = gql`
  query($id: ID){
    book(id: $id){
      id
      name
      genre
      author{
        id
        name
        age
        books{
          name
          id
        }
      }
    }
  }
`

// MUTATIONS
const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!){
    addBook(name: $name, genre: $genre, authorId: $authorId){
      name
      id
    }
  }
`

export {
  getAuthorsQry,
  getBooksQry,
  getBookQry,
  addBookMutation,
};

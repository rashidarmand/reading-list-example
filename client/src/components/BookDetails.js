import React from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries';

const BookDetails = ({ data: { book } }) => (
  <div id='book-details'>
    {!book
      ? <h2>No Book Selected...</h2>
      : <div>
          <h2>{ book.name }</h2>
          <p>Genre: { book.genre }</p>
          <p>Author: { book.author.name }</p>
          <p>Catalogue:</p>
          <ul className='other-books'>
            {book.author.books.map(item => (
              <li key={ item.id }>{ item.name }</li>
            ))}
          </ul>
        </div>
      }
  </div>
);

// The options function runs every time the component receives new props
// It resets the variables for the query with the new props
const queryOptions = {
  options: (props) => ({
    variables: {
      id: props.bookId
    }
  })
}

export default graphql(getBookQuery, queryOptions)(BookDetails);
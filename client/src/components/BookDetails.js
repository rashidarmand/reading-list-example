import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries';

class BookDetails extends Component {
  displayBookDetails = () => {
    const { book } = this.props.data;
    if(book) {
      return (
        <div>
          <h2>{ book.name }</h2>
          <p>{ book.genre }</p>
          <p>{ book.author.name }</p>
          <p>All Books by this author</p>
          <ul className='other-books'>
            {book.author.books.map(item => (
              <li key={ item.id }>{ item.name }</li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <div>No Book Selected...</div>;
    }
  }

  render() {
    return (
      <div id='book-details'>
        { this.displayBookDetails() }
      </div>
    )
  }
}

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
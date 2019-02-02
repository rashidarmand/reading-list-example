import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries';
import BookDetails from './BookDetails';

class BookList extends Component {
  state = {
    selected: null
  }
  
  handleClick = (id) => this.setState({ selected: id });

  displayBooks = () => {
    const { loading, books } = this.props.data;
    return loading
      ? <li>Loading Books...</li>
      : books.map(({ id, name }) => (
          <li 
            key={ id } 
            onClick={() => this.handleClick(id)}
          >
            { name }
          </li>
        ));
  }

  render() {
    return (
      <div>
        <ul id="book-list">
          { this.displayBooks() }
        </ul>
        <BookDetails bookId={ this.state.selected } />
      </div>
    )
  }
}

export default graphql(getBooksQuery)(BookList)

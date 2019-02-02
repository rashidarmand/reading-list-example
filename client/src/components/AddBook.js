import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, addBookMutation } from '../queries';

class AddBook extends Component {
  state = {
    name: '',
    genre: '',
    authorId: ''
  }

  handleChange = ({ target:{ name, value } }) => this.setState({ [name]: value });

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addBookMutation({
      variables : { ...this.state }
    });
  }

  displayAuthors = () => {
    const { loading, authors } = this.props.getAuthorsQuery;
    if(loading) {
      return <option>Loading Authors...</option>;
    } else {
      return authors.map(author => (
        <option key={ author.id } value={ author.id }>{ author.name }</option>
      ));
    }
  }
  render() {
    return (
      <form id='add-book' onSubmit={ this.handleSubmit }>
        <div className="field">
          <label>Book Name:</label>
          <input type="text" name='name' onChange={ this.handleChange } />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input type="text" name='genre' onChange={ this.handleChange } />
        </div>
        <div className="field">
          <label>Author:</label>
          <select name='authorId' onChange={ this.handleChange }>
            <option>Select Author</option>
            { this.displayAuthors() }
          </select>
        </div>
        <button>+</button>
      </form>
    )
  }
}

const Queries = compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' })
);

export default Queries(AddBook)
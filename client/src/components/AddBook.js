import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries';

class AddBook extends Component {
  state = {
    name: '',
    genre: '',
    authorId: ''
  }

  handleChange = ({ target:{ name, value } }) => this.setState({ [name]: value });

  handleSubmit = (e) => {
    e.preventDefault();
    const emptyFields = Object.keys(this.state).some(key => this.state[key] === '');
    if(emptyFields) return;
    this.props.addBookMutation({
      variables : { ...this.state },
      refetchQueries: [{ query: getBooksQuery }]
    });
    clear();
  }

  displayAuthors = () => {
    const { loading, authors } = this.props.getAuthorsQuery;
    return loading
      ? <option>Loading Authors...</option>
      : authors.map(({ id, name }) => (
          <option key={ id } value={ id }>{ name }</option>
        ));
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

// Clear form fields after submitting.
const clear = () => {
  document.querySelector('select').selectedIndex = 0;
  [...document.getElementsByTagName('input')].forEach(element => element.value = '');
}

const connectQueries = compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' })
);

export default connectQueries(AddBook)
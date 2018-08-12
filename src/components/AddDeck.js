import React, { Component } from 'react';

class AddDeck extends Component {
  state = {
    inputValue: ''
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const deck = {
      name: this.state.inputValue,
      cards: []
    };
    this.props.addDeck(deck);
    this.setState({
      inputValue: ''
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="inputValue" onChange={this.onChange} />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default AddDeck;

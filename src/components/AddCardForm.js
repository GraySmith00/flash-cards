import React, { Component } from 'react';

class AddCardForm extends Component {
  state = {
    front: '',
    back: ''
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const newCard = {
      front: this.state.front,
      back: this.state.back,
      showAnswer: false
    };
    this.props.addCardToDeck(newCard);
  };

  render() {
    return (
      <div>
        <h3>Add New Card</h3>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="front"
            onChange={this.handleChange}
            placeholder="front..."
          />
          <input
            type="text"
            name="back"
            onChange={this.handleChange}
            placeholder="back..."
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default AddCardForm;

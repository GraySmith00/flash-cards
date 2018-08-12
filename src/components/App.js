import React, { Component } from 'react';
import AddDeck from './AddDeck';
import AddCardForm from './AddCardForm';
import '../css/App.css';
import DisplayRandomCard from './DisplayRandomCard';

class App extends Component {
  state = {
    decks: [],
    currentDeck: {}
  };

  componentDidMount() {
    const decks = JSON.parse(localStorage.getItem('decks'));
    if (decks) {
      this.setState({
        decks
      });
    }
  }

  addDeck = newDeck => {
    const deckNameAlreadyExists = this.state.decks.find(
      deck => deck.name === newDeck.name
    );
    if (!deckNameAlreadyExists) {
      this.setState({
        decks: [...this.state.decks, newDeck]
      });
      localStorage.setItem(
        'decks',
        JSON.stringify([...this.state.decks, newDeck])
      );
    } else {
      alert('That deck already exists!');
    }
  };

  selectCurrentDeck = e => {
    const currentDeck = this.state.decks.find(
      deck => deck.name === e.target.value
    );
    this.setState({
      currentDeck
    });
  };

  addCardToDeck = newCard => {
    const newCurrentDeck = { ...this.state.currentDeck };
    newCurrentDeck.cards.push(newCard);
    this.setState({
      currentDeck: newCurrentDeck
    });
  };

  render() {
    const { currentDeck } = this.state;

    const currDeckOptions = this.state.decks.map((deck, i) => (
      <option key={i} value={deck.name}>
        {deck.name}
      </option>
    ));

    let cardDisplay;

    if (currentDeck.cards && currentDeck.cards.length > 0) {
      cardDisplay = <DisplayRandomCard currentDeck={this.state.currentDeck} />;
    }
    return (
      <div className="App">
        <h1>Welcome to Flashcards!</h1>
        <AddDeck addDeck={this.addDeck} />
        <select name="currentDeck" onChange={this.selectCurrentDeck}>
          {currDeckOptions}
        </select>
        {currentDeck.cards && (
          <AddCardForm addCardToDeck={this.addCardToDeck} />
        )}
        {cardDisplay}
      </div>
    );
  }
}

export default App;

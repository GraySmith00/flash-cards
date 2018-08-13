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

    const currentDeck = JSON.parse(localStorage.getItem('currentDeck'));
    if (currentDeck) {
      this.setState({
        currentDeck
      });
    }
  }

  setLocalStorage(key, arg) {
    localStorage.setItem(key, JSON.stringify(arg));
  }

  addDeck = newDeck => {
    const deckNameAlreadyExists = this.state.decks.find(
      deck => deck.name === newDeck.name
    );
    if (!deckNameAlreadyExists) {
      this.setState({
        decks: [...this.state.decks, newDeck],
        currentDeck: newDeck
      });
      this.setLocalStorage('decks', [...this.state.decks, newDeck]);
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
    this.setLocalStorage('currentDeck', this.state.currentDeck);
  };

  addCardToDeck = newCard => {
    const newCurrentDeck = { ...this.state.currentDeck };
    newCurrentDeck.cards.push(newCard);
    this.setState({
      currentDeck: newCurrentDeck
    });
    this.setLocalStorage('decks', this.state.decks);
  };

  render() {
    console.log(this.state.decks);
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
        <select
          name="currentDeck"
          onChange={this.selectCurrentDeck}
          value={this.state.currentDeck.name}
        >
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

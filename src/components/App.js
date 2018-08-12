import React, { Component } from 'react';
import AddDeck from './AddDeck';
import '../css/App.css';

class App extends Component {
  state = {
    decks: [],
    currentDeck: {}
  };

  addDeck = newDeck => {
    const deckNameAlreadyExists = this.state.decks.find(
      deck => deck.name === newDeck.name
    );
    if (!deckNameAlreadyExists) {
      this.setState({
        decks: [...this.state.decks, newDeck]
      });
    } else {
      console.log('That deck already exists!');
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

  render() {
    const currDeckOptions = this.state.decks.map((deck, i) => (
      <option key={i} value={deck.name}>
        {deck.name}
      </option>
    ));

    return (
      <div className="App">
        <AddDeck addDeck={this.addDeck} />
        <select name="currentDeck" onChange={this.selectCurrentDeck}>
          {currDeckOptions}
        </select>
      </div>
    );
  }
}

export default App;

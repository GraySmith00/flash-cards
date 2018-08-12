import React, { Component } from 'react';

class DisplayRandomCard extends Component {
  state = {
    currentCard: {}
  };

  getRandomCard = () => {
    const { cards } = this.props.currentDeck;
    const randomCard = cards[Math.floor(Math.random() * cards.length)];
    if (randomCard.front !== this.state.currentCard.front) {
      this.setState({
        currentCard: randomCard
      });
    } else if (cards.length > 1) {
      this.getRandomCard();
    }
  };

  showAnswer = () => {
    const newCurrentCard = { ...this.state.currentCard };
    newCurrentCard.showAnswer = !this.state.currentCard.showAnswer;
    this.setState({
      currentCard: newCurrentCard
    });
  };

  render() {
    console.log(this.state.currentCard.showAnswer);

    return (
      <div>
        <h3>DisplayRandomCard</h3>
        <p>{this.state.currentCard.front}</p>
        {this.state.currentCard.showAnswer && (
          <p>{this.state.currentCard.back}</p>
        )}
        <button onClick={this.getRandomCard}>New Card</button>
        {this.state.currentCard.front && (
          <button onClick={this.showAnswer}>ShowAnswer</button>
        )}
      </div>
    );
  }
}

export default DisplayRandomCard;

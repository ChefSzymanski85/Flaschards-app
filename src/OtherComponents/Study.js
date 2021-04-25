import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck } from "../utils/api";
import Card from "../CardComponents/Card";

function Study() {
  const [deck, setDeck] = useState({ cards: [] });
  const [cardNumber, setCardNumber] = useState(1);

  const { deckId } = useParams();
  const history = useHistory();

  // use utility function to read deck by ID and set it to deck array
  useEffect(() => {
    async function getDeck() {
      const cardsList = await readDeck(deckId);
      setDeck(cardsList);
    }
    getDeck();
  }, [deckId]);

  const cardCount = deck.cards.length;
  const cardTitle = `Card ${cardNumber} of ${cardCount}`;
  const card = deck.cards[cardNumber - 1]; // used to display correct card number

  // allows user to flip to next card and restart after reaching final card
  function nextHandler() {
    if (cardNumber === cardCount) {
      const returnToHomePage = !window.confirm(
        "Restart cards?\n\nClick 'cancel' to return to the home page."
      );
      return returnToHomePage ? history.push("/") : setCardNumber(1);
    }
    setCardNumber((prevState) => Math.min(cardCount, prevState + 1));
  }

  // must be at least 3 cards in deck to study
  if (cardCount <= 2) {
    return (
      <div>
        <nav aria-label="breadcrumb" style={{ width: "36rem" }}>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">
                <span className="oi oi-home mr-1" />
                Home
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>
        <h1>Study: {deck.name}</h1>
        <h2>Not enough cards.</h2>
        <p>
          You need at least 3 cards to study. There are {cardCount} cards in the
          deck.
        </p>
        <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary">
          <span className="oi oi-plus" /> Add cards
        </Link>
      </div>
    );
  }

  // else display study deck
  return (
    <div>
      <nav aria-label="breadcrumb" style={{ width: "36rem" }}>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home mr-1" />
              Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <h1>Study: {deck.name}</h1>
      <Card card={card} title={cardTitle}>
        <button type="button" className="btn btn-primary" onClick={nextHandler}>
          Next
        </button>
      </Card>
    </div>
  );
}

export default Study;

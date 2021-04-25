import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api";

function Decks() {
  const [decks, setDecks] = useState([]);

  // use utility function to get the decks and list them
  function getDecks() {
    listDecks().then(setDecks);
  }

  useEffect(getDecks, []);

  // open a window to make sure the user knows the consequences of deleting a deck
  function deleteDeckHandler(deckId) {
    const deleted = window.confirm(
      "Delete this deck?\n\nYou will not be able to recover it."
    );
    // if yes is clicked, then delete the deck
    if (deleted) {
      deleteDeck(deckId).then(getDecks);
    }
  }

  // map all decks and display information about each deck
  const mappedDecks = decks.map((deck) => {
    return (
      <div className="card mb-5" key={deck.id} style={{ width: "36rem" }}>
        <h5 className="card-header">
          {deck.name}
          <p className="float-right font-weight-light">
            {deck.cards.length} cards
          </p>
        </h5>
        <div className="card-body">
          <p className="card-text">{deck.description}</p>
        </div>
        <div className="card-footer">
          <Link
            to={`decks/${deck.id}`}
            className="btn btn-secondary mr-2"
            title="View deck"
          >
            <span className="oi oi-eye mr-2" /> View
          </Link>
          <Link
            to={`/decks/${deck.id}/study`}
            className="btn btn-primary"
            title="Study deck"
          >
            <span className="oi oi-book" /> Study
          </Link>
          <button
            className="btn btn-danger float-right"
            title="Delete Deck"
            onClick={() => deleteDeckHandler(deck.id)}
          >
            <span className="oi oi-trash" />
            Delete
          </button>
        </div>
      </div>
    );
  });

  return (
    <div>
      <Link to="decks/new" className="btn btn-secondary mb-2">
        <span className="oi oi-plus" />
        {` Create deck`}
      </Link>
      {mappedDecks}
      {/* return mapped decks array with header */}
    </div>
  );
}

export default Decks;

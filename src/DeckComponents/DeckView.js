import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { deleteCard, deleteDeck, readDeck } from "../utils/api";
import Cards from "../CardComponents/Cards";

function DeckView() {
  const [deck, setDeck] = useState({ cards: [] });
  const { deckId } = useParams();
  const history = useHistory();

  // use utility function to load deck by id and set it to deck variable
  function loadDeck() {
    readDeck(deckId).then(setDeck);
  }

  useEffect(loadDeck, [deckId]);

  // open a window to make sure the user knows the consequences of deleting a deck
  function deleteDeckHandler() {
    const deleted = window.confirm(
      "Delete this deck?\n\nYou will not be able to recover it."
    );
    if (deleted) {
      deleteDeck(deck.id).then(() => history.push("/decks"));
    }
  }

  // open a window to make sure the user knows the consequences of deleting a card
  function deleteCardHandler(cardId) {
    const deleted = window.confirm(
      "Delete this card?\n\nYou will not be able to recover it."
    );
    if (deleted) {
      deleteCard(cardId).then(loadDeck);
    }
  }

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
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>
      <div className="card mb-5" key={deck.id} style={{ width: "36rem" }}>
        <h5 className="card-header">{deck.name}</h5>
        <div className="card-body">
          <p className="card-text">{deck.description}</p>
        </div>
        <div className="card-footer">
          <Link
            to={`/decks/${deck.id}/edit`}
            className="btn btn-secondary mr-2"
            title="Edit deck"
          >
            <span className="mr-2" /> Edit
          </Link>
          <Link
            to={`/decks/${deck.id}/study`}
            className="btn btn-primary mr-2"
            title="Study deck"
          >
            <span className="oi oi-book" /> Study
          </Link>
          <Link
            to={`/decks/${deck.id}/cards/new`}
            className="btn btn-primary mr-2"
            title="Add cards"
          >
            <span className="oi oi-plus" /> Add cards
          </Link>
          <button className="btn btn-danger float-right" title="Delete Deck">
            <span className="oi oi-trash" onClick={deleteDeckHandler} />
          </button>
        </div>
        <Cards deck={deck} onCardDelete={deleteCardHandler} />
        {/* call Cards component with parameters */}
      </div>
    </div>
  );
}

export default DeckView;

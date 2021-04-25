import React from "react";
import { Link } from "react-router-dom";

function Cards({ deck, onCardDelete }) {
  // set deck prop to empty cards array
  const { cards = [] } = deck;

  // map all cards in deck and display front and back of card
  const mappedCards = cards.map((card) => (
    <div className="row">
      <div className="col-sm-6">
        <div className="card mb-3" style={{ height: "10rem" }}>
          <div className="card-body">
            <p className="card-text">{card.front}</p>
          </div>
        </div>
      </div>
      <div className="col-sm-6">
        <div className="card mb-3" style={{ height: "10rem" }}>
          <div className="card-body">
            <p className="card-text">{card.back}</p>
            <button className="btn btn-danger float-right" title="Delete Deck">
              <span
                className="oi oi-trash"
                onClick={() => onCardDelete(card.id)}
                // use handler to delete card by id
              />
            </button>
            <Link
              to={`/decks/${deck.id}/cards/${card.id}/edit`}
              className="btn btn-secondary mr-2 float-right"
              title="Edit deck"
            >
              <span className="mr-2" /> Edit
            </Link>
            {/* link to edit cards */}
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div>
      <h3 className="mt-3 ml-3">Cards</h3>
      {mappedCards}
      {/* return mapped cards array */}
    </div>
  );
}

export default Cards;

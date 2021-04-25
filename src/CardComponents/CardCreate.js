import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import CardForm from "./CardForm";

function CardCreate() {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({ cards: [] });

  // use utility function to get the deck by Id and then set it to deck variable
  useEffect(() => {
    readDeck(deckId).then(setDeck);
  }, [deckId]);

  // use utility function to create a card within the deck using a callback function
  function buttonSubmitHandler(card) {
    createCard(deckId, card);
  }

  // button handler for when the user is finished adding cards
  function doneHandler() {
    history.push(`/decks/${deckId}`);
  }

  return (
    <div>
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
              Add Card
            </li>
          </ol>
        </nav>
      </div>
      <h1>{deck.name}: Add Card</h1>
      <CardForm
        deckName={deck.name}
        initialState={deck}
        onSubmit={buttonSubmitHandler}
        onDone={doneHandler}
        // Call CardForm component with props
      />
    </div>
  );
}

export default CardCreate;

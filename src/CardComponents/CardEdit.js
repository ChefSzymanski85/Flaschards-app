import React, { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api";
import CardForm from "./CardForm";

function CardEdit() {
  const history = useHistory();
  const { deckId, cardId } = useParams();

  const [card, setCard] = useState({ front: "", back: "" });
  const [deck, setDeck] = useState({ cards: [] });

  // use utility function to get the deck and card by Id and then set it to state variable
  useEffect(() => {
    readDeck(deckId).then(setDeck);
    readCard(cardId).then(setCard);
  }, [deckId, cardId]);

  // use utility function to update card then call done handler
  function buttonSubmitHandler(card) {
    updateCard(card).then(doneHandler);
  }

  // button handler for when the user is finished editing cards
  function doneHandler() {
    history.push(`/decks/${deck.id}`);
  }

  // While page is loading, display loading, then load CardForm component with props
  const child = card.id ? (
    <CardForm
      onSubmit={buttonSubmitHandler}
      onDone={doneHandler}
      deckName={deck.name}
      initialState={card}
      doneButtonLabel="Cancel"
    />
  ) : (
    <p>Loading...</p>
  );

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
              <Link to={`/decks/${deckId}`}>Deck {deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Edit Card {cardId}
            </li>
          </ol>
        </nav>
      </div>
      <h1>Edit Card</h1>
      {child}
      {/* display previously set variable */}
    </div>
  );
}

export default CardEdit;

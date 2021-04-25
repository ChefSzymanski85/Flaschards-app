import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";

function DeckCreate() {
  const history = useHistory();
  const [deck, setDeck] = useState({ name: "", description: "" });

  // handler used to submit a new deck
  function buttonSubmitHandler(deck) {
    createDeck(deck).then((createdDeck) =>
      history.push(`/decks/${createdDeck.id}`)
    );
  }

  // prevent page from reloading after submitting a new deck
  function formSubmitHandler(event) {
    event.preventDefault();
    buttonSubmitHandler(deck);
  }

  // handler used for displaying new deck info
  function changeHandler({ target: { name, value } }) {
    setDeck((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  // using history to go back a page when user clicks cancel button
  function cancel() {
    history.goBack();
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
            <li className="breadcrumb-item active" aria-current="page">
              Create Deck
            </li>
          </ol>
        </nav>
      </div>
      <h1>Create Deck</h1>
      <form onSubmit={formSubmitHandler} style={{ width: "36rem" }}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            name="name"
            type="text"
            className="form-control"
            id="name"
            value={deck.name}
            required={true}
            placeholder="Deck Name"
            onChange={changeHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            className="form-control"
            id="description"
            rows="4"
            value={deck.description}
            required={true}
            placeholder="Brief description of the deck"
            onChange={changeHandler}
          ></textarea>
        </div>
        <button
          type="cancel"
          className="btn btn-secondary mr-2"
          onClick={cancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          onSubmit={buttonSubmitHandler}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default DeckCreate;

import React, { useState } from "react";

function CardForm({
  onSubmit,
  onDone,
  initialState,
  doneButtonLabel = "Done", // needed because otherwise button will display cancel
}) {
  // using prop to set card to initial state
  const [card, setCard] = useState(initialState);

  // function to update card
  function changeHandler({ target: { name, value } }) {
    setCard((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  // function to handle submit
  function formSubmitHandler(event) {
    event.preventDefault();
    onSubmit({ ...card });
    setCard({ front: "", back: "" });
  }

  return (
    <div>
      <form onSubmit={formSubmitHandler} style={{ width: "36rem" }}>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea
            name="front"
            className="form-control"
            id="front"
            rows="3"
            required={true}
            placeholder="Front side of card"
            value={card.front}
            onChange={changeHandler}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="back"
            className="form-control"
            id="back"
            rows="3"
            required={true}
            placeholder="Back side of card"
            value={card.back}
            onChange={changeHandler}
          ></textarea>
        </div>
        <button
          type="cancel"
          className="btn btn-secondary mr-2"
          onClick={onDone}
        >
          {doneButtonLabel}
          {/* will display cancel or done based on whether card is being created or edited */}
        </button>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}

export default CardForm;

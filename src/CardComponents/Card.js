import React, { useEffect, useState } from "react";

// allow the card to be switched from front to back and vice versa
const nextView = {
  front: "back",
  back: "front",
};

function Card({ card = {}, title, children }) {
  const [view, setView] = useState("front");
  const [flipped, setFlipped] = useState(false);

  // handles flipping of the cards
  function flipHandler() {
    setView((prevState) => nextView[prevState]);
    setFlipped(true);
  }

  useEffect(() => {
    setView("front");
    setFlipped(false);
  }, [card]);

  return (
    <div>
      <div className="card" style={{ width: "36rem" }}>
        <h5 className="card-header">{title}</h5>
        <div className="card-body">
          <div className="card-text">
            <p>{card[view]}</p>
            <button
              type="button"
              className="btn btn-secondary mr-2"
              onClick={flipHandler}
            >
              Flip
            </button>
            {flipped && children}
            {/* children prop allows more code to be inserted when calling component  */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;

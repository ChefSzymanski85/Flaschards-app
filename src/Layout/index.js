import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import NotFound from "../OtherComponents/NotFound";
import Header from "./Header";
import Home from "./Home";
import Study from "../OtherComponents/Study";
import CardCreate from "../CardComponents/CardCreate";
import CardEdit from "../CardComponents/CardEdit";
import DeckCreate from "../DeckComponents/DeckCreate";
import DeckEdit from "../DeckComponents/DeckEdit";
import DeckView from "../DeckComponents/DeckView";

function Layout() {
  return (
    // create routes for each base component
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/decks/new">
            <DeckCreate />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId/edit">
            <DeckEdit />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <CardCreate />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <CardEdit />
          </Route>
          <Route exact={true} path="/decks/:deckId">
            <DeckView />
          </Route>
          <Route exact={true} path="/decks">
            <Redirect to="/" />
          </Route>
          <Route exact={true} path="/">
            <Home />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;

// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Spots from "./components/Spots";
import OneSpot from "./components/OneSpot";
import CreateSpot from "./components/CreateSpot";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/spots">
            <Spots />
          </Route>
          <Route exact path="/spots/host">
            <CreateSpot />
          </Route>
          <Route exact path="/spots/:spotId">
            <OneSpot />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Home from "./pages/Home";
import Repository from "./pages/Repository";

const Main = styled.main`
  padding: 0 1rem 1rem 1rem;
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
`;

export default function App() {
  return (
    <Router>
      <Main>
        <Title>GitHub repository browser</Title>
        <Switch>
          <Route path="/:repoId">
            <Repository />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Main>
    </Router>
  );
}

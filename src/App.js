import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Repository from "./pages/Repository";
import Home from "./pages/Home";
import styled from "styled-components";

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

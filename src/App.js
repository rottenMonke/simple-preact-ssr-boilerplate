import { Component, h } from "preact";
import { Router } from "preact-router";
import Navigation from "./components/Navigation/Navigation";
import List from "./pages/List";
import Main from "./pages/Main";
import './App.css'

export default class App extends Component {
  render({ url }) {
    return (
      <div>
        <Navigation />
        <Router url={url}>
          <Main path="/" />
          <List path="/list" />
        </Router>
      </div>
    );
  }
}

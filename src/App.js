import { Component, h, Fragment } from "preact";
import { Router } from "preact-router";
import Navigation from "./components/Navigation/Navigation";
import { routes } from "./routingConfig";
import "./App.css";

export default class App extends Component {
  render({ url, pageData }) {
    return (
      <Fragment>
        <Navigation />
        <Router url={url}>
          {routes.map(({ Component, path }) => (
            <Component path={path} pageData={pageData} />
          ))}
        </Router>
      </Fragment>
    );
  }
}

import {  h, Fragment, FunctionalComponent } from "preact";
import { Router } from "preact-router";
import Navigation from "./components/Navigation/Navigation";
import { routes } from "./routingConfig";
import "./App.css";

export interface IApp {
  url?: string
  pageData?: any
}

export const App: FunctionalComponent<IApp> = ({ url, pageData }) => {
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
import { h, Component } from "preact";
import render from "preact-render-to-string";
import App from "./App";

export default (props) => render(<App {...props} />);

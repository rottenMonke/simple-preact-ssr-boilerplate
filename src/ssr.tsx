import { h } from "preact";
import render from "preact-render-to-string";
import { App, IApp } from "./App";

export default (props:IApp) => render(<App {...props} />);

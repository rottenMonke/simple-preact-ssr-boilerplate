import { h, Component, hydrate } from 'preact'
import App from './App'

hydrate(<App />, document.getElementById('root'));
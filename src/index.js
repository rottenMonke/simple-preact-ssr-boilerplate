import { h, Component, render, hydrate } from 'preact'
import App from './App'

const renderer = process.env.MODE === 'production' ? hydrate : render;

renderer(<App />, document.getElementById('root'))

import { h, hydrate } from 'preact'
import { App } from './App'
import './types/global.ts'

hydrate(<App /> , document.getElementById('root'));
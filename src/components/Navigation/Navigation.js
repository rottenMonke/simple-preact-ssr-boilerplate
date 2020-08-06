import { h } from "preact";
import './Navigation.css'

export default function Navigation() {
  return (
    <nav class="Navigation">
      <a class="Navigation__link" href="/">main</a>
      <a class="Navigation__link" href="/list">list</a>
    </nav>
  );
}

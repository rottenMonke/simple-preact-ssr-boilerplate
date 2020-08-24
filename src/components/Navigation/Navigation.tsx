import { h, FunctionComponent } from "preact";
import './Navigation.css'

const Navigation:FunctionComponent = () => {
  return (
    <nav class="Navigation">
      <a class="Navigation__link" href="/">main</a>
      <a class="Navigation__link" href="/list">list</a>
    </nav>
  );
}

export default Navigation;
import { h } from "preact";
import './Body.css'

export default function Navigation({ children }) {
  return (
    <main class="Body">
        {children}
    </main>
  );
}

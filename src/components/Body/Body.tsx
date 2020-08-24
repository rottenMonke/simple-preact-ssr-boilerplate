import { h, FunctionComponent, JSX } from "preact";
import './Body.css'

interface IBody {
  children?: JSX.Element[] | JSX.Element
}

const Body:FunctionComponent<IBody> = ({ children }) => {
  return (
    <main class="Body">
        {children}
    </main>
  );
}

export default Body;
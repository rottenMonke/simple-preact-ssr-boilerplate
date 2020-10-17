import { h, FunctionComponent, JSX } from "preact";
import './CharacterName.css'

interface ICharacterName {
    children?: JSX.Element[] | JSX.Element | String
}

const CharacterName:FunctionComponent<ICharacterName> = ({ children }) => {
  return (
    <h3 class="CharacterName">
        {children}
    </h3>
  );
}

export default CharacterName;
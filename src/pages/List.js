import { h } from "preact";
import Body from '../components/Body/Body'
import usePageData from "../lib/hooks/usePageData";
import { fetchCharacters } from '../api'
import { useEffect } from "preact/hooks";

export default function List({ pageData }) {
  const [characters,setCharacters] = usePageData(pageData)
  
  useEffect(async() => {
    if(!characters) setCharacters(await fetchCharacters())
  }, [])

  return (
    <Body>
        {characters ? characters.map( ({ name, id }) => <h3 key={id}>{name}</h3>) : null}
    </Body>
  );
}

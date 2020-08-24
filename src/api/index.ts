import fetch from 'node-fetch';
import { ICharacter } from '../types/Character';

export const fetchCharacters:() => Promise<ICharacter[]> = async () =>  {
    const response = await fetch('http://localhost:5555/api/getCharacters');
    const characters = await response.json();
    return characters;
}


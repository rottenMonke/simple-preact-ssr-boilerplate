import fetch from 'node-fetch';

export const fetchCharacters = async () => {
    const response = await fetch('http://localhost:5555/api/getCharacters');
    const questions = await response.json();
    return questions;
}
import React, { useState } from "react";
import { useCreateLetterMutation } from "../../app/services/api/letterApi";
import { useSnackbar } from 'notistack';
import Button from '@mui/material/Button';
import clickSound from './soundEffects/click.mp3';

import './_letterStyle.css';
import { number } from "yup";

export default function WriteLetter() {
  const playSoundEffect = () => {
    const audio = new Audio(clickSound);
    audio.play();
  };

  const [letters, setLetters] = useState(['']);
  const [numberOfCharacters, setNumberOfCharacters] = useState([0])
  const { enqueueSnackbar } = useSnackbar();
  const [createLetter, { isLoading }] = useCreateLetterMutation();

  const handleChange = (event, index) => {
    const value = event.target.value;
    playSoundEffect();

    if (numberOfCharacters[index] >= 1500) {
      const newLettersList = [...letters]
      newLettersList.push([''])
      setLetters(newLettersList);

      const newCharacterList = [...numberOfCharacters];
      newLettersList.push([0])
      setNumberOfCharacters(newCharacterList)
    } else {
      const newLettersList = [...letters];
      newLettersList[index] = value;
      setLetters(newLettersList);

      const newCharacterList = [...numberOfCharacters];
      newCharacterList[index] = newLettersList[index].length
      setNumberOfCharacters(newCharacterList)

    }
  };


  const renderTextareas = () => {
    return letters.map((letter, index) => (
      <div>
        <h1>{numberOfCharacters[index]}</h1>
        <div className="paper" key={index}>
          <textarea
            className="paper-input"
            value={letters[index]}
            onChange={(e) => handleChange(e, index)}
          />
        </div>

        <textarea
          wrap="hard"
          className="non-editable-text-area"
          readOnly />
      </div>
    ))
  }


  return (
    <div className="letter">
      {renderTextareas()}

      <Button
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={isLoading}
        onClick={async () => {
          try {
            // const sentLetter = await createLetter(letter).unwrap();
            enqueueSnackbar('Letter Created', { variant: 'success' });
          } catch (err) {
            console.log(err);
            enqueueSnackbar('Letter Created Failed: ' + err, { variant: 'error' });
          }
        }}
      >
        Send Letter
      </Button>
    </div>
  );
}

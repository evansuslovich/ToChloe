import React, { useState } from "react"
import { useDispatch } from "react-redux";
import { useCreateLetterMutation } from "../../app/services/api/lettersApi";
import { useSnackbar } from 'notistack'
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'

export default function WriteLetter() {

  const [letter, setLetter] = useState("");
  const [createLetter, { isLoading }] = useCreateLetterMutation();
  const { enqueueSnackbar } = useSnackbar()

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setLetter(values => ({ ...values, [name]: value }))
  }

  return (
    <div>

      <TextField
        margin="normal"
        required
        fullWidth
        id="letter"
        label="Letter"
        name="letter"
        autoComplete="Letter"
        autoFocus
        onChange={handleChange}
      />

      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={isLoading}
        onClick={async () => {

          try {
            const sentLetter = await createLetter(letter).unwrap();
            enqueueSnackbar('Letter Created', { variant: 'success' });
          } catch (err) {
            console.log(err)
            enqueueSnackbar('Letter Created Failed: ' + err, { variant: 'error' });
          }
        }}
      >
        Send Letter
      </Button>
    </div >
  )
}
import React, { useState } from "react"
import { useCreateLetterMutation } from "../../app/services/api/letterApi";
import { useSnackbar } from 'notistack'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function WriteLetter() {

  const [letter, setLetter] = useState("");
  const { enqueueSnackbar } = useSnackbar()
  const [createLetter, { isLoading }] = useCreateLetterMutation()

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
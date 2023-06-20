import React from "react"
import { useCreateLetterMutation } from "../../app/services/api/letterApi";
import { useSnackbar } from 'notistack'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../../app/services/slices/authSlice"


export default function WriteLetter() {

  const user = useSelector(selectCurrentUser)
  const [letterCredentials, setLetterCredentials] = React.useState({
    letter: '', fromUserId: user.id, toUserId: ''
  }); const { enqueueSnackbar } = useSnackbar()
  const [createLetter, { isLoading }] = useCreateLetterMutation()

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setLetterCredentials(values => ({ ...values, [name]: value }))
  }

  return (
    <div>
      <TextField
        margin="normal"
        required
        id="letter"
        label="Letter"
        name="letter"
        autoComplete="Letter"
        autoFocus
        onChange={handleChange}
      />

      <TextField
        margin="normal"
        required
        id="toUserId"
        label="To User Id"
        name="toUserId"
        autoComplete="To User Id"
        autoFocus
        onChange={handleChange}
      />
      <Button
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={isLoading}
        onClick={async () => {
          try {
            await createLetter(letterCredentials).unwrap();
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
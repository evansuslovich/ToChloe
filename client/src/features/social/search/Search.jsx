import React, { useState } from "react"
import Button from "@mui/material/Button";
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../../../app/services/slices/authSlice";
import TextField from "@mui/material/TextField";
import { useSearchMutation } from "../../../app/services/api/authApi";
import SearchedUsers from "./SearchedUsers";

export default function Search() {

  const user = useSelector(selectCurrentUser)

  const [search, { isLoading }] = useSearchMutation()
  const [query, setQuery] = useState("")
  const [users, setUsers] = useState([])

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setQuery(values => ({ ...values, [name]: value }))
  }

  return (
    <div>

      <h1>Search for Users</h1>


      <TextField
        margin="normal"
        required
        id="query"
        label="Search for Users"
        name="query"
        autoComplete="Search"
        autoFocus
        onChange={handleChange}
      />

      {SearchedUsers(users)}

      <Button
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={isLoading}
        onClick={async () => {
          const arrayOfUsers = await search({
            query: query,
            username: user.username
          }).unwrap();
          setUsers(arrayOfUsers)
        }}
      >
        Search for Users
      </Button>
    </div >

  )
}
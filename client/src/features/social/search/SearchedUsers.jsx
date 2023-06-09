import React, { useEffect, useState } from "react"
import { NavLink } from 'react-router-dom';

export default function SearchedUsers(listOfUsers) {

  const [users, setUsers] = useState([])

  useEffect(() => {
    const usersInformation = listOfUsers.map((user) => (
      <ul key={user.username}>
        <li key={user.username}>
          <NavLink to={"/account/" + user.username}>{user.username}</NavLink>
        </li>
      </ul >
    ))
    setUsers(usersInformation)
  }, [listOfUsers])

  return (
    <div>
      {users}
    </div >
  )
}
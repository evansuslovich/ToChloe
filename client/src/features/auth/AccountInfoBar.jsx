import React from "react"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../../app/services/slices/authSlice"
import { NavLink } from "react-router-dom"

import dayjs from "dayjs"

export default function Account() {

  const user = useSelector(selectCurrentUser)

  return (
    <div className="navBar">

      <ul>
        <li>
          {user.firstName} {' '} {user.lastName}
        </li>
        <li>
          {user.username}
        </li>

        <li>
          {user.friendsList.length} penpallers
        </li>

        <li>
          Member since {dayjs(user.createdAt).format("MM/DD/YYYY")}
        </li>
      </ul>
      <NavLink to="/account/friends">Friends: {user.friendsList.length}</NavLink>
      <br />
      <NavLink to="/account/acceptRequests">Accept Friend Requests</NavLink>


    </div >
  )
}
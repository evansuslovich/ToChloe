import React from "react"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../../app/services/slices/authSlice"
import { NavLink } from "react-router-dom"

import dayjs from "dayjs"

export default function Account() {

  const user = useSelector(selectCurrentUser)

  return (
    <div className="header">
      <h1 className="logo">
        {user.firstName} {' '} {user.lastName}
      </h1>
      <h1 className="logo">
        {user.friendsList.length} penpallers
      </h1>
      <h1 className="logo">
        Member since {dayjs(user.createdAt).format("MM/DD/YYYY")}
      </h1>


      {/* <NavLink to="/account/friends">Friends: {user.friendsList.length}</NavLink>
      <br />
      <NavLink to="/account/acceptRequests">Accept Friend Requests</NavLink> */}


    </div >
  )
}
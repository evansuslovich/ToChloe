import React from "react"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../../app/services/slices/authSlice"
import { NavLink } from "react-router-dom"
import AccountInfoBar from "./AccountInfoBar"

import dayjs from "dayjs"

export default function Account() {

  const user = useSelector(selectCurrentUser)

  return (
    <div className="account">

      <AccountInfoBar />

      <div>
        <h1>My Penpals</h1>
      </div>

      <div>
        <h1>My connections</h1>
      </div>
    </div >
  )
}
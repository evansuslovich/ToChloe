import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../../app/services/slices/authSlice"
import { NavLink } from "react-router-dom"

export default function Friends() {

  const user = useSelector(selectCurrentUser)

  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const friends = user.friendsList.map((friend) => (
      <ul key={friend}>
        <li key={friend}>
          <NavLink to={"/" + friend}>{friend}</NavLink>
        </li>
      </ul >
    ))
    setFriends(friends)
  }, [user.friendsList])

  return (
    <div>
      {friends}
    </div >
  )
}
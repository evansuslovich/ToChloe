import { useSelector } from "react-redux"
import { selectCurrentUser } from "../../app/services/slices/authSlice"
import AccountInfoBar from "./AccountInfoBar"

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
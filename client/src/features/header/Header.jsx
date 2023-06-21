import { NavLink } from "react-router-dom"
import UserMenu from "./UserMenu";

export default function Header() {


  return (
    <div className="header">
      <NavLink className="logo" to="/">ToChloe</NavLink>

      <div className="account-logo">
        <UserMenu />
      </div>

    </div>
  )
}
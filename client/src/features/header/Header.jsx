import { NavLink, useNavigate } from "react-router-dom"
import PersonIcon from '@mui/icons-material/Person';
import IconButton from "@mui/material/IconButton";
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
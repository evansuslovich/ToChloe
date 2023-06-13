import { NavLink, useNavigate } from "react-router-dom"
import PersonIcon from '@mui/icons-material/Person';
import IconButton from "@mui/material/IconButton";

export default function Header() {

  const navigate = useNavigate()

  return (
    <div className="header">
      <NavLink className="logo" to="/">ToChloe</NavLink>

      <div className="account-logo">
        <IconButton
          onClick={() => { navigate("/account") }}
          color="contrast"
          aria-label="user">
          <PersonIcon />
        </IconButton>
      </div>

    </div>
  )
}
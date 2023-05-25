import React from "react";
import { Link } from "react-router-dom"
import { selectIsLoggedIn } from "../app/services/slices/authSlice"
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../app/services/api/authApi";
import { setUser } from "../app/services/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';
import Intro from "../features/homepage/Intro"
import WriteLetter from "../features/letters/WriteLetter";

export default function Header() {

  const [logout] = useLogoutMutation();
  const auth = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <div>
      {auth &&
        <div>
          <Link to="/account"> Account </Link>

          <br />

          <Link onClick={async () => {
            await logout().unwrap();
            dispatch(setUser(null));
            localStorage.setItem('token', null)
            navigate('/');
            enqueueSnackbar("You've been logged out", { variant: 'info' });
          }}>
            Logout
          </Link>

          <WriteLetter />

        </div>
      }

      {!auth &&
        <div>
          <Intro />
        </div>
      }
    </div>
  )
}
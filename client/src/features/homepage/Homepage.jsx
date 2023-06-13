import React from "react";
import { Link, useNavigate } from "react-router-dom"
import { selectIsLoggedIn } from "../../app/services/slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../app/services/api/authApi";
import { setUser } from "../../app/services/slices/authSlice";
import { useSnackbar } from 'notistack';
import Intro from "./Intro";
import WriteLetter from "../letters/WriteLetter";
import Search from "../social/search/Search";
import Header from "../header/Header";

export default function Homepage() {

  const [logout] = useLogoutMutation();
  const auth = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  return (

    <div>
      <Header />
      {
        auth &&
        <div>
          <Search />
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

      {
        !auth &&
        <div>
          <Intro />
        </div>
      }

    </div >
  )
}
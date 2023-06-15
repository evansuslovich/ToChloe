import React from "react";

import {
  Route, Routes, useLocation, Navigate
} from 'react-router-dom';

import Homepage from "./features/homepage/Homepage"

import SignIn from "./features/auth/SignIn";
import SignUp from "./features/auth/SignUp";
import Account from "./features/auth/Account";
import User from "./features/social/User";
import Friends from "./features/auth/Friends";
import ReceivedRequests from "./features/auth/ReceivedRequests";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "./app/services/slices/authSlice";

function App() {

  return (
    <div className="app">
      <Routes>

        <Route index element={<Homepage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />


        <Route path="/account" element={
          <RequireAuth>
            <Account />
          </RequireAuth>
        }
        />

        <Route path="/:username" element={
          <RequireAuth>
            <User />
          </RequireAuth>}
        />

        <Route path="/account/friends" element={
          <RequireAuth>
            <Friends />
          </RequireAuth>} />

        <Route path="/account/acceptRequests" element={
          <RequireAuth>
            <ReceivedRequests />
          </RequireAuth>
        }
        />

      </Routes>
    </div>
  );
}

function RequireAuth({ children }) {
  const auth = useSelector(selectIsLoggedIn);
  const location = useLocation();

  if (!auth) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }
  return children;
}


export default App;
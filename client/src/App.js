import React from "react";

import {
  Route, Routes
} from 'react-router-dom';

import Homepage from "./features/homepage/Homepage"

import SignIn from "./features/auth/SignIn";
import SignUp from "./features/auth/SignUp";
import Account from "./features/auth/Account";
import User from "./features/social/User";
import Friends from "./features/auth/Friends";
import ReceivedRequests from "./features/auth/ReceivedRequests";

function App() {

  return (
    <div className="app">
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/:username" element={(<User />)} />
        <Route path="/account/friends" element={(<Friends />)} />
        <Route path="/account/acceptRequests" element={(<ReceivedRequests />)} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </div>
  );
}

export default App;
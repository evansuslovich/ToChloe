import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { useGetUserQuery } from "../../app/services/api/authApi";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../app/services/slices/authSlice";


export default function User() {
  const params = useParams();
  const { username } = params;
  const user = useSelector(selectCurrentUser)

  const { data, isLoading, error } = useGetUserQuery({ "username": user.username, "searchedUser": username, })

  const userData = data

  return (
    <div>
      {!error && (
        <div>
          <div>
            {isLoading && (<h1>Loading</h1>)}
          </div>

          {!isLoading && (
            <div>
              <h1>{userData.username}</h1>
              <h1>Connected to: {userData.friendsList.length}</h1>
            </div>
          )}
        </div>
      )}

      {error && (
        <h1>User is private</h1>
      )}

    </div>
  )
}
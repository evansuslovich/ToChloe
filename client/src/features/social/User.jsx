import { useParams, useNavigate } from "react-router-dom";
import { useGetUserQuery } from "../../app/services/api/authApi";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../app/services/slices/authSlice";
import { useSendFriendRequestMutation, useAcceptFriendRequestMutation } from "../../app/services/api/authApi";
import { Button } from "@mui/material";
import Friend from "./Friend";

export default function User() {
  const params = useParams();
  const navigate = useNavigate()
  const { username } = params;
  const user = useSelector(selectCurrentUser)

  const [sendFriendRequest] = useSendFriendRequestMutation();
  const [acceptFriendRequest] = useAcceptFriendRequestMutation();

  const { data, isLoading, error } = useGetUserQuery({ "username": user.username, "searchedUser": username, })

  const userData = data

  return (
    <div>
      {!error && (
        <div>
          {isLoading && (<h1>Loading</h1>)}

          {!isLoading && (
            <Friend friendData={userData} />
          )}
        </div>
      )}

      {error && error.data.message === "User is private" && (
        <div>
          <Friend friendData={error.data} />
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
            onClick={async () => {
              sendFriendRequest({
                userSendingFriendRequestUsername: user.username,
                userReceivingFriendRequestUsername: username
              }).unwrap();

              window.location.reload(false);
            }}
          >
            Send Friend Request
          </Button>
        </div>
      )}

      {error && error.data.message === "Pending request" && (
        <div>
          <Friend friendData={error.data} />
          <h1>Pending Request</h1>
        </div>
      )}

      {error && error.data.message === "Accept request" && (
        <div>
          <Friend friendData={error.data} />
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
            onClick={async () => {
              acceptFriendRequest({
                userReceivingFriendRequestUsername: user.username,
                userSendingFriendRequestUsername: username
              }).unwrap();

              window.location.reload(false);
            }}
          >
            Accept Friend Request
          </Button>
        </div>
      )}

      {error && error.data.message === "User does not exist" && (
          <h1>{error.data.message}</h1>
      )}


      {error && error.data.message === "Searched user is the same as the active user" && (
        navigate("/account")
      )}

    </div >
  )
}
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../../app/services/slices/authSlice"
import { useAcceptFriendRequestMutation } from "../../app/services/api/authApi"
import Button from "@mui/material/Button"

export default function ReceivedRequests() {

  const user = useSelector(selectCurrentUser)

  const [acceptFriendRequest] = useAcceptFriendRequestMutation();

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const listOfRequests = user.receivedRequestsList.map((friend) => (
      <ul key={friend}>
        <li key={friend}>
          {friend} requests you
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={async () => {
              acceptFriendRequest({
                userReceivingFriendRequestUsername: user.username,
                userSendingFriendRequestUsername: friend
              }).unwrap();

              window.location.reload(false);
            }}
          >
            Accept Friend Request
          </Button>
        </li>
      </ul >
    ))
    setRequests(listOfRequests)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.receivedRequestsList])

  return (
    <div>
      {
        requests.length > 0 && (
          <div>
            {requests.map((request) => (
              <div key={request.id}>
                <p>{request}</p>
              </div>
            ))}
          </div>
        )
      }
    </div>
  )
}
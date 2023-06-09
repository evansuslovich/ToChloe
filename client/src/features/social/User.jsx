import { useParams, useNavigate } from "react-router-dom";
import { useGetUserQuery } from "../../app/services/api/authApi";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../app/services/slices/authSlice";
import Friend from "./Friend";

export default function User() {
  const params = useParams();
  const navigate = useNavigate()
  const { username } = params;
  const user = useSelector(selectCurrentUser)

  const { data, isLoading, error } = useGetUserQuery({ "username": user.username, "searchedUser": username, })

  const userData = data

  console.log(error)


  return (
    <div>
      {!error && (
        <div>
          <div>
            {isLoading && (<h1>Loading</h1>)}
          </div>

          {!isLoading && (
            <Friend friendData={userData} />
          )}
        </div>
      )}

      {error && (
        <h1>{error.data.message}</h1>
      )}

      {error && error.data.message === "Users are the same!" && (
        navigate("/account")
      )}
    </div>
  )
}
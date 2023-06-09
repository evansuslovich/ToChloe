export default function Friend(friendData) {
  const friend = friendData.friendData.user
  return (
    <div>
      <h1>First name {friend.firstName}</h1>
      <h1>Last name {friend.lastName}</h1>
      <h1>Username {friend.username}</h1>
      <h1>Friends {friend.friendsList.length}</h1>
    </div>
  )
}
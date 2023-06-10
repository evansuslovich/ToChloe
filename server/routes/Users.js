const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const auth = require("../../server/middleware/auth")


const { Users } = require("../models")

const invalidateTokens = []

router.post("/register", async (req, res) => {

  // Our register logic starts here
  try {

    // Get user input
    const { firstName, lastName, username, password1, password2 } = req.body;

    if (!(firstName && lastName && username && password1 && password2)) {
      return res.status(400).send("Input Empty");
    }
    // if passwords do not match
    if (password1 !== password2) {
      return res.status(400).send("Passwords do not match!")
    }
    // check if user already exist
    const oldUser = await Users.findOne({
      where: (
        { username: username }, { firstName: firstName }, { lastName: lastName }
      )
    });

    if (oldUser) {
      return res.status(409).send("User is already created.");
    }

    //Encrypt user password
    encryptedUserPassword = await bcrypt.hash(password1, 10);

    // Create user in our database
    const user = await Users.create({
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: encryptedUserPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, username },
      process.env.TOKEN_KEY,
      {
        expiresIn: "5h",
      }
    );

    // save user token
    user.token = token;

    // return new user
    return res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
})

router.post("/login", async (req, res) => {

  // Get user input
  const { username, password } = req.body;

  // Validate user input
  if (!(username && password)) {
    return res.status(400).send("All input is required");
  }

  // Validate if user exist in our database
  const user = await Users.findOne({ where: ({ username: username }) });


  if (user && (await bcrypt.compare(password, user.password))) {
    // Create token
    const token = jwt.sign(
      { user_id: user._id, username },
      process.env.TOKEN_KEY,
      {
        expiresIn: "5h",
      }
    );
    // save user token
    user.token = token;


    // return the user that has logged in
    console.log("user logged in")
    res.status(200).json(user);
  } else {
    return res.status(400).send("Invalid Credentials");
  }
});

router.get("/getUser", async (req, res) => {
  const { username, searchedUser } = req.query

  let user;
  let searchedForUser;

  try {
    // get users
    user = await Users.findOne({ where: ({ username: username }) })
    searchedForUser = await Users.findOne({ where: ({ username: searchedUser }) })

    // undefined parameters or users not found
    if (user === undefined || searchedForUser === undefined) {
      return res.status(403).json({ message: "User does not exist" });
    }

    // users are same 
    if (user.username === searchedForUser.username) {
      return res.status(403).json({ message: "Users are the same" });
    }

    // users are frieds
    if (
      user.friendsList.includes(searchedForUser.username) &&
      searchedForUser.friendsList.includes(user.username)) {
      return res.status(200).json({ message: "Users are friends", user: searchedForUser });
    } else {
      return res.status(403).json({ message: "User is private" });
    }
  } catch (err) {
    return res.status(403).json({ message: "User does not exist" })
  }
})

router.get("/profile", auth, async (req, res) => {
  const token = req.headers['x-access-token'];

  // is the user's token invalidated? 
  if (invalidateTokens.includes(token)) {
    console.log("invalidated profile fetch")
    return res.status(400).send("Cookie is invalidated")
  }
  else {
    // gets profile related to username 
    console.log("profile fetch")
    const user = await Users.findOne({ where: ({ username: req.user.username }) });
    res.status(200).json(user);
  }

});

router.post("/logout", auth, (req, res) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(401).send('Invalid token');
  }

  try {
    if (!invalidateTokens.includes(token)) {

      // Invalidate JWT token by setting expiration to a past date
      invalidateTokens.push(token)

      const expirationDate = new Date(0);
      const invalidatedToken = jwt.sign({}, process.env.TOKEN_KEY, {
        expiresIn: expirationDate.getTime(),
      });

      // Clear token from client-side by setting response header to an empty string
      res.set('x-access-token', invalidatedToken);
      console.log("logged out")

      return res.status(200).json("Cookie has been removed")
    }
    else {
      return res.status(400).json("Cookie is invalidated")
    }
  } catch (err) {
    console.log(err)
  }
});

router.post("/send-friend-request", async (req, res) => {
  try {
    const { userSendingFriendRequestUsername, userReceivingFriendRequestUsername } = req.body

    const userSendingFriendRequest = await Users.findOne({ where: ({ username: userSendingFriendRequestUsername }) });

    const userReceivingFriendRequest = await Users.findOne({ where: ({ username: userReceivingFriendRequestUsername }) });

    if (userReceivingFriendRequest == null || userSendingFriendRequest == null || !userSendingFriendRequest || !userReceivingFriendRequest) {
      return res.status(403).send("The user receiving the friend request or the user sending the friend request does not exist")
    }

    if (userSendingFriendRequestUsername === userReceivingFriendRequestUsername) {
      return res.status(403).send("You can't request yourself")
    }

    if (userSendingFriendRequest.sentRequestsList.includes(userReceivingFriendRequest.username)) {
      return res.status(403).json({
        "message": "User is already requested"
      })
    }

    userSendingFriendRequest.sentRequestsList = userSendingFriendRequest.sentRequestsList.concat([userReceivingFriendRequestUsername]);

    await userSendingFriendRequest.save()

    return res.status(200).json(userSendingFriendRequest);

  } catch (error) {
    return res.status(500).json({ message: error });
  }
})

router.post("/accept-friend-request", async (req, res) => {
  const { userReceivingFriendRequestUsername, userSendingFriendRequestUsername } = req.body

  const userSendingFriendRequest = await Users.findOne({ where: ({ username: userSendingFriendRequestUsername }) });

  const userReceivingFriendRequest = await Users.findOne({ where: ({ username: userReceivingFriendRequestUsername }) });

  if (userReceivingFriendRequest == null || userSendingFriendRequest == null) {
    return res.status(403).json({
      "message": "The user receiving the friend request or the user sending the friend request does not exist"
    })
  }

  if (userReceivingFriendRequest.friendsList.includes(userSendingFriendRequest.username) ||
    userSendingFriendRequest.friendsList.includes(userReceivingFriendRequest.username)) {
    return res.status(403).json({ "message": "Already Friends" })
  }

  // add user who is receiving the friend request
  userSendingFriendRequest.friendsList = userSendingFriendRequest.friendsList.concat([userReceivingFriendRequestUsername])
  await userSendingFriendRequest.save()

  // add user who is accepting the friend request
  userReceivingFriendRequest.friendsList = userReceivingFriendRequest.friendsList.concat([userSendingFriendRequestUsername])
  await userReceivingFriendRequest.save()

  // remove friend request because both users are already friends 
  // you can't request someone who you're already friends with
  const senderFriendRequests = [...userSendingFriendRequest.sentRequestsList];
  const index = senderFriendRequests.indexOf(userReceivingFriendRequestUsername);

  if (index !== -1) {
    senderFriendRequests.splice(index, 1);
  }
  userSendingFriendRequest.sentRequestsList = senderFriendRequests;
  await userSendingFriendRequest.save()

  return res.status(200).json(userSendingFriendRequest)

})

router.post("/search-for-user", async (req, res) => {

  const { query, username } = req.body

  const users = await Users.findAll();

  const resultOfSearch = []

  for (let i = 0; i < users.length; i++) {
    // if the query is included in a username also can't search for yourself
    if (users[i].username.includes(query.query) && users[i].username !== username) {
      resultOfSearch.push(users[i])
    }
  }
  return res.status(200).json(resultOfSearch)
})



module.exports = router 
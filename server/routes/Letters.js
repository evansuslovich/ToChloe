const express = require('express')
const router = express.Router();

const { Letters } = require("../models")
const { Users } = require("../models")

router.post("/createLetter", async (req, res) => {


  // get letter, fromUserId, and toUserId from the request
  const { letter, fromUserId, toUserId } = req.body


  let fromUser;
  let toUser;

  if (letter.length === 0) {
    return res.status(403).json({ "message": "The letter is empty!" })
  }

  // get the user sending the letter
  fromUser = await Users.findOne({ where: ({ id: fromUserId }) })
  // if the user sendind the letter does not exist, throw an error
  if (fromUser === null || fromUser === undefined) {
    return res.status(403).json({ "message": "The user sending this letter does not exist" })
  }

  // get the user sending the letter
  toUser = await Users.findOne({ where: ({ id: toUserId }) })
  // if the user receiving the letter does not exist, throw an error
  if (toUser === null || toUser === undefined) {
    return res.status(403).json({ "message": "The user receiving this letter does not exist" })
  }

  try {
    // create the letter
    const createdLetter = await Letters.create({ letter: letter, fromUserId: fromUserId, toUserId: toUserId })
    return res.status(200).json(createdLetter)
  } catch (error) {
    return res.status(403).json(error)
  }
})

module.exports = router 
const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const auth = require("../../server/middleware/auth")


const { Letters } = require("../models")

router.post("/createLetter", async (req, res) => {
  try {

    // get letter fromr request
    const { letter } = req.body

    // create letter
    const createdLetter = await Letters.create({ letter: letter })
    return res.status(200).json(createdLetter)
  } catch (err) {
    console.log(err)
  }
})

module.exports = router 
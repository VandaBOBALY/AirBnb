const express = require("express");
const router = express.Router();

const Room = require("../models/room");
const User = require("../models/User");

const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");
const password = req.body.password;
const token = uid2(16);
const salt = uid2(16);
const hash = SHA256(password + salt).toString(encBase64);

// READ ########################################

router.get("/user", async (req, res) => {
  try {
    let id = req.query.id;
    const user = await User.findById(id);
    if (user) {
      res.json(user);
    } else {
      res.json({ message: "User not found" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});

// CREATE ########################################

router.post("/user/create", async (req, res) => {
  try {
    let username = req.body.username;
    let email = req.body.email;

    const newUser = new User({
      username: username,
      email: email
    });
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    res.json({ message: error.message });
  }
});

// UPDATE ########################################

router.post("/user/update", async (req, res) => {
  try {
    let id = req.query.id;
    let username = req.body.username;
    let email = req.body.email;

    const userToUpdate = await User.findById(id);
    if (userToUpdate) {
      if (username) {
        userToUpdate.username = username;
      }
      if (email) {
        userToUpdate.email = email;
      }
      await userToUpdate.save();
      res.json(userToUpdate);
    } else {
      res.json({ message: "User not found" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});

// DELETE ########################################

router.post("/user/delete", async (req, res) => {
  try {
    let id = req.query.id;
    const userToDelete = await User.findById(id);
    if (userToDelete) {
      userToDelete.remove();
      res.json({ message: "User deleted" });
    } else {
      res.json({ message: "User not found" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;

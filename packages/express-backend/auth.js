import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
var User = import ('./../express-backend/models/user.js');

const creds = [];

export function registerUser(req, res) {
    const { username, pwd } = req.body; // from form
  
    if (!username || !pwd) {
      res.status(400).send("Bad request: Invalid input data.");
    } else if (creds.find((c) => c.username === username)) {
      res.status(409).send("Username already taken");
    } else {
      bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(pwd, salt))
        .then((hashedPassword) => {
          generateAccessToken(username).then((token) => {
            console.log("Token:", token);
            res.status(201).send({ token: token });
            creds.push({ username, hashedPassword });
          });
        });
    }
  }

  function generateAccessToken(username) {
    return new Promise((resolve, reject) => {
      jwt.sign(
        { username: username },
        process.env.TOKEN_SECRET,
        { expiresIn: "1d" },
        (error, token) => {
          if (error) {
            reject(error);
          } else {
            resolve(token);
          }
        }
      );
    });
  }

  export function authenticateUser(req, res, next) {
    const authHeader = req.headers["authorization"];
    //Getting the 2nd part of the auth header (the token)
    const token = authHeader && authHeader.split(" ")[1];
  
    if (!token) {
      console.log("No token received");
      res.status(401).end();
    } else {
      jwt.verify(
        token,
        process.env.TOKEN_SECRET,
        (error, decoded) => {
          if (decoded) {
            next();
          } else {
            console.log("JWT error:", error);
            res.status(401).end();
          }
        }
      );
    }
  }

  export function loginUser(req, res) {
    const { username, pwd } = req.body; 
    console.log("Logging in with creds username: |" + username +"| password: |" + pwd + "|"); // for debugging
    mongoose.model('User').findOne({ username: username }).then((retrievedUser) => {
      if (!retrievedUser) {
      // invalid username
      console.log("Couldn't retrieve username"); // for debugging
      res.status(401).send("Unauthorized");
      } else {
        console.log("Retrieved user password: |" + retrievedUser + "|"); // for debugging (need to fix how i access the password from the retrieved user object)
        if (retrievedUser.password == pwd) {
          generateAccessToken(username).then((token) => {
            res.status(200).send({ token: token });
          });
        } else {
          // invalid password
          console.log("Password didn't match"); // for debugging
          res.status(401).send("Unauthorized");
        }
      bcrypt
        .compare(pwd, retrievedUser.password)
        .then((matched) => {
        if (matched) {
          console.log("Password matched"); // for debugging
          generateAccessToken(username).then((token) => {
          res.status(200).send({ token: token });
          });
        } else {
          // invalid password
          console.log("Password didn't match"); // for debugging
          res.status(401).send("Unauthorized");
        }
        })
        .catch(() => {
        res.status(401).send("Unauthorized");
        });
      }
    }).catch(() => {
      res.status(500).send("Internal Server Error");
    });
  }
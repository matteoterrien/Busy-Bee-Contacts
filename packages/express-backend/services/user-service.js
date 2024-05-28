import User from "../models/user.js";

function getUser(username, password) {
  let promise;
  if (username && !password) {
    console.error("Invalid Password");
  } else if (username && password) {
    findUser(username, password);
  }
}

function findUser(username, password) {
  User.find({ username: username, password: password });
}

function addUser(username, password) {
  const userToAdd = new User();
}

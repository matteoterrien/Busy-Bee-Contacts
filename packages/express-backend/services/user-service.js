import User from "../models/user.js";

function getUser(username, password) {
  let promise;
  if (username && !password) {
    console.error("Invalid Password");
    throw error("Invalid Password");
  } else if (username && password) {
    findUser(username, password);
  }
}

function findUser(username, password) {
  User.find({ username: username, password: password });
}

function addUser(user) {
  const userToAdd = new User(user);
  const promise = userToAdd.save();
  return promise;
}

async function deleteUser(userID) {
  try {
    const deletedContact = await User.findByIdAndDelete(userID);
    return deletedContact;
  } catch (error) {
    console.error("Error deleting contact:", error);
  }
}

import mongoose from "mongoose";
import Contact from "../models/contact.js";
import dotenv from "dotenv";

dotenv.config();
const DB_CONNECTION = process.env.MONGODB_URI;

mongoose.set("debug", true);

mongoose
  .connect(DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected 😄");
  })
  .catch(() => {
    console.log("DB connection failed");
  });

function getUsers(name, job) {
  let promise;
  if (name === undefined && job === undefined) {
    promise = Contact.find();
  } else if (name && job) {
    promise = findUserByNameAndJob(name, job);
  } else if (name && !job) {
    promise = findUserByName(name);
  } else if (job && !name) {
    promise = findUserByJob(job);
  }
  return promise;
}

function findUserById(id) {
  return Contact.findById(id);
}

function addUser(user) {
  const userToAdd = new Contact(user);
  const promise = userToAdd.save();
  return promise;
}

function findUserByName(name) {
  return Contact.find({ name: name });
}

function findUserByJob(job) {
  return Contact.find({ job: job });
}

function findUserByNameAndJob(name, job) {
  return Contact.find({ name: name, job: job });
}

async function findAndDelete(id) {
  try {
    const deletedUser = await Contact.findByIdAndDelete(id);
    return deletedUser;
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
  findAndDelete,
};

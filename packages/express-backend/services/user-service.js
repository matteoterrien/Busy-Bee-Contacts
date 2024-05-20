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

function getContacts(first_name, last_name) {
  let promise;
  if (first_name === undefined && last_name === undefined) {
    promise = Contact.find();
  } else if (first_name && last_name) {
    promise = findContactByFirstAndLastName(first_name, last_name);
  } else if (first_name && !last_name) {
    promise = findContactByFirstName(first_name);
  } else if (job && !name) {
    promise = findContactByLastName(last_name);
  }
  return promise;
}

function findContactById(id) {
  return Contact.findById(id);
}

function addContact(user) {
  const contactToAdd = new Contact(user);
  const promise = contactToAdd.save();
  return promise;
}

function findContactByFirstName(name) {
  return Contact.find({ first_name: name });
}

function findContactByLastName(name, job) {
  return Contact.find({ last_name: name });
}

function findContactByFirstAndLastName(first, last) {
  return Contact.find({ first_name: first, last_name: last });
}

async function findAndDelete(id) {
  try {
    const deletedContact = await Contact.findByIdAndDelete(id);
    return deletedContact;
  } catch (error) {
    console.error("Error deleting contact:", error);
  }
}

export default {
  findContactById,
  addContact,
  getContacts,
  findContactByFirstName,
  findContactByLastName,
  findContactByFirstAndLastName,
  findAndDelete,
};

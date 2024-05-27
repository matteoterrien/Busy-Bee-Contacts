import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import * as auth from "./auth.js";
import contactService from "./services/contact-service.js";
import dotenv from "dotenv";

dotenv.config();
const DB_CONNECTION = process.env.MONGODB_URI;
const app = express();
const port = 8000;

mongoose.set("debug", false);

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

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get("/contacts", (req, res) => {
  const first_name = req.query["first_name"];
  const last_name = req.query["last_name"];
  contactService
    .getContacts(first_name, last_name)
    .then((result) => {
      res.send({ contact_list: result });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("An error ocurred in the server.");
    });
});

app.get("/contacts/favorite", (req, res) => {
  contactService.findContactByFavorites().then((result) => {
    if (result === undefined || result === null)
      res.status(404).send("Resource not found.");
    else res.send({ contact_list: result });
  });
});

app.get("/contacts/:id", (req, res) => {
  const id = req.params["id"];
  contactService.findContactById(id).then((result) => {
    if (result === undefined || result === null)
      res.status(404).send("Resource not found.");
    else res.send({ contact_list: result });
  });
});

app.put("/contacts/:id", (req, res) => {
  const id = req.params["id"];
  contactService
    .findContactAndUpdate(id)
    .then((result) => {
      if (result === undefined || result === null)
        res.status(404).send("Resource not found");
      else res.send({ contact_list: result });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("An error occurred on the server.");
    });
});

app.delete("/contacts/:id", (req, res) => {
  const id = req.params["id"];
  contactService
    .findContactById(id)
    .then((result) => {
      if (result === undefined) {
        res.status(404).send("Resource not found.");
      } else {
        contactService
          .findAndDelete(id)
          .then(() => {
            res.status(204).send();
          })
          .catch((error) => {
            console.log(error);
            res.status(500).send("An error occurred on the server.");
          });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("An error occurred on the server.");
    });
});

// app.post("/signup", auth.registerUser);

// app.post("/users", auth.authenticateUser, (req, res) => {
//   const userToAdd = req.body;
//   Users.addUser(userToAdd).then((result) => res.status(201).send(result));
// });

// app.post("/login", auth.loginUser);

/*
app.post("/users", (req, res) => {
  const user = req.body;
  contactService.addUser(user).then((savedUser) => {
    if (savedUser) res.status(201).send(savedUser);
    else res.status(500).end();
  });
});
*/

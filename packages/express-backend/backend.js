import express from "express";
import cors from "cors";
import contactService from "./services/contact-service.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get("/contacts", (req, res) => {
  const name = req.query["name"];
  const job = req.query["job"];
  contactService
    .getUsers(name, job)
    .then((result) => {
      res.send({ users_list: result });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("An error ocurred in the server.");
    });
});

app.get("/contacts/:id", (req, res) => {
  const id = req.params["id"];
  contactService.findUserById(id).then((result) => {
    if (result === undefined || result === null)
      res.status(404).send("Resource not found.");
    else res.send({ users_list: result });
  });
});

app.post("/contacts", (req, res) => {
  const user = req.body;
  contactService.addUser(user).then((savedUser) => {
    if (savedUser) res.status(201).send(savedUser);
    else res.status(500).end();
  });
});

app.delete("/contacts/:id", (req, res) => {
  const id = req.params["id"].slice(1);
  contactService.findUserById(id).then((result) => {
    if (result === undefined) {
      res.status(404).send("resource not found.");
    } else {
      contactService.findAndDelete(id);
      return res.status(204).send();
    }
  });
});

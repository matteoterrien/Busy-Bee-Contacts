import React, { useState, useEffect } from "react";
import Form from "./Form";
import { ChakraProvider } from "@chakra-ui/react";
import ProfileCard from "./ProfileCard";
import ContactPop from "./ContactPop";
import Login from "./Login";
import HomePage from "./HomePage";
import { Route } from "react-router-dom";

function MyApp() {
  const [contacts, setContacts] = useState([]);
  const INVALID_TOKEN = "INVALID_TOKEN";
  const [token, setToken] = useState(INVALID_TOKEN);
  const [message, setMessage] = useState("");

  const [selectedContactId, setSelectedContactId] = useState(null);

  function postContact(person) {
    const promise = fetch("http://localhost:8000/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
      code: 201,
    })
      .then((res) => {
        if (res.status == 201) {
          return res.json();
        } else {
          console.log("ERROR: Returned Status ", res.status);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return promise;
  }

  function deleteContact(index) {
    const person = characters.at(index)._id;
    const promise = fetch("http://localhost:8000/contacts/:" + person, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      code: 204,
    })
      .then((res) => {
        if (res.status == 404) {
          console.log("Did not find contact");
        } else if (res.status != 204) {
          console.log("ERROR: Returned Status ", res.status);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return promise;
  }

  function fetchContacts() {
    const promise = fetch("http://localhost:8000/contacts");
    // {
    //   headers: addAuthHeader(),
    // }
    // );

    return promise;
  }

  function addAuthHeader(otherHeaders = {}) {
    if (token === INVALID_TOKEN) {
      return otherHeaders;
    } else {
      return {
        ...otherHeaders,
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
    }
  }

  function updateList(person) {
    postContact(person)
      .then((promise) => {
        setCharacters([...characters, promise]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function removeOneContact(index) {
    deleteContact(index)
      .then((promise) => {
        const updated = contacts.filter((contact, i) => {
          return i !== index;
        });
        setContacts(updated);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function selectContact(userId) {
    setSelectedContactId(userId);
  }

  useEffect(() => {
    fetchContacts()
      .then((res) => (res.status === 200 ? res.json() : undefined))
      .then((json) => {
        if (json) {
          setContacts(json["contacts_list"]);
        } else {
          setContacts(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      <ContactPop />
      <HomePage
        contactData={contacts}
        removeCharacter={removeOneContact}
        selectContact={selectContact}
      />
      <Form handleSubmit={updateList} />
      {/* <Route path="/login" element={<Login handleSubmit={loginUser} />} /> */}
    </div>
  );
}

export default MyApp;

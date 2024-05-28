import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import ContactPop from "./ContactPop";
import HomePage from "./HomePageV2";
import Contact from "./Contact";
import Edit from "./ContactEdit";
import CreateContact from "./CreateContact";
import Login from "./LoginPage";

function MyApp() {
  const [contacts, setContacts] = useState([]);
  const [favoriteContacts, setFavoriteContacts] = useState([]);
  const INVALID_TOKEN = "INVALID_TOKEN";
  const [token, setToken] = useState(INVALID_TOKEN);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchContacts()
      .then((res) => (res.status === 200 ? res.json() : undefined))
      .then((json) => {
        if (json) {
          setContacts(json["contact_list"]);
        } else {
          setContacts(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetchFavoriteContacts()
      .then((json) => {
        if (json) {
          setFavoriteContacts(json["contact_list"]);
        } else {
          setContacts(null);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch favorite contacts:", error);
      });
  }, []);

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

  const fetchFavoriteContacts = async () => {
    const res = await fetch("http://localhost:8000/contacts/favorite");
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  };

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

  const sortContactsByFirstName = (contacts) => {
    return contacts
      .slice()
      .sort((a, b) => a.first_name.localeCompare(b.first_name));
  };

  useEffect(() => {
    fetchContacts()
      .then((res) => (res.status === 200 ? res.json() : undefined))
      .then((json) => {
        if (json) {
          setContacts(sortContactsByFirstName(json["contact_list"]));
        } else {
          setContacts(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetchFavoriteContacts()
      .then((json) => {
        if (json) {
          setFavoriteContacts(sortContactsByFirstName(json["contact_list"]));
        } else {
          setContacts(null);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch favorite contacts:", error);
      });
  }, []);

  return (
    <div id="page">
      {/* <ContactPop /> */}
      <Routes>
        <Route
          exact
          path="/"
          element={
            <HomePage
              contactData={contacts}
              favoriteContactData={favoriteContacts}
              removeCharacter={removeOneContact}
            />
          }
        />
        <Route exact path="/contact/:id" element={<Contact />} />
        <Route exact path="/edit/:id" element={<Edit />} />
        <Route exact path="/createContact/" element={<CreateContact />} />
        <Route exact path="/deleteContact/contact/:id" element={<HomePage />} />
        {/* <Route path="/login" element={<LoginPage handleSubmit={loginUser} />} /> */}
      </Routes>
    </div>
  );
}

export default MyApp;

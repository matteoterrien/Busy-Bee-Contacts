import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Form from "./Form";
import ProfileCard from "./ProfileCard";
import ContactPop from "./ContactPop";
import HomePage from "./HomePage";

function MyApp() {
  const [contacts, setContacts] = useState([]);
  const [favoriteContacts, setFavoriteContacts] = useState([]);
  const INVALID_TOKEN = "INVALID_TOKEN";
  const [token, setToken] = useState(INVALID_TOKEN);
  const [message, setMessage] = useState("");

  const [selectedContactId, setSelectedContactId] = useState(null);

  const BasicExample = () => (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="./">HomePage</Link>
          </li>
          <li>
            <Link to="./">ProfileCard</Link>
          </li>
        </ul>
  
        <hr />
  
        <Route path="./" component={HomePage} />
        <Route path="./" component={ProfileCard} />
      </div>
    </Router>
  );

  const HomePage = () => (
    <div>
      <HomePage 
        contactData={contacts}
        favoriteContactData={favoriteContacts}
        removeCharacter={removeOneContact}
        selectContact={selectContact}
      />
    </div>
  );

  function selectContact(userId) {
    setSelectedContactId(userId);
  }

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

  useEffect(() => {
    if (selectedContactId) {
      // Logic to change the page to Contact using the selectedContactId
    }
  }, [selectedContactId]);

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

  return (
    <div className="container">
      {/* <ContactPop /> */}
      <HomePage
        contactData={contacts}
        favoriteContactData={favoriteContacts}
        removeCharacter={removeOneContact}
        selectContact={selectContact}
      />
      {/* <Form handleSubmit={updateList} /> */}
      {/* <Route path="/login" element={<Login handleSubmit={loginUser} />} /> */}
    </div>
  );
}

export default MyApp;

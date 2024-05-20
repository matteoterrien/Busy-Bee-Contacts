import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";
import Login from "./Login";

function MyApp() {
  const [characters, setCharacters] = useState([]);
  const INVALID_TOKEN = "INVALID_TOKEN";
  const [token, setToken] = useState(INVALID_TOKEN);
  const [message, setMessage] = useState("");

  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
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

  function deleteUser(index) {
    const person = characters.at(index)._id;
    const promise = fetch("Http://localhost:8000/users/:" + person, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      code: 204,
    })
      .then((res) => {
        if (res.status == 404) {
          console.log("Did not find user");
        } else if (res.status != 204) {
          console.log("ERROR: Returned Status ", res.status);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return promise;
  }

  function fetchUsers() {
    const promise = fetch(`${API_PREFIX}/users`, {
      headers: addAuthHeader()
    });
  
    return promise;
  }

  function addAuthHeader(otherHeaders = {}) {
    const promise = fetch(`${API_PREFIX}/users`, {
      method: "POST",
      headers: addAuthHeader({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(person)
    });
    if (token === INVALID_TOKEN) {
      return otherHeaders;
    } else {
      return {
        ...otherHeaders,
        Authorization: `Bearer ${token}`
      };
    }
  }

  function updateList(person) {
    postUser(person)
      .then((promise) => {
        setCharacters([...characters, promise]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function removeOneCharacter(index) {
    deleteUser(index)
      .then((promise) => {
        const updated = characters.filter((character, i) => {
          return i !== index;
        });
        setCharacters(updated);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchUsers()
      .then((res) =>
        res.status === 200 ? res.json() : undefined
      )
      .then((json) => {
        if (json) {
          setCharacters(json["users_list"]);
        } else {
          setCharacters(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
      <Route
        path="/login"
        element={<Login handleSubmit={loginUser} />}
      />
      <Route
        path="/signup"
        element={<Login handleSubmit={signupUser} buttonLabel="Sign Up" />}
      />
    </div>
  );
}

export default MyApp;

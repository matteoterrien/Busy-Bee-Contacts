import React, { useState, useEffect } from "react";
import Table from "./HomePage";
import Form from "./Form";
import { ChakraProvider } from "@chakra-ui/react";
import ProfileCard from "./ProfileCard";
import ContactPop from "./ContactPop";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  const [selectedUserId, setSelectedUserId] = useState(null);

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
    const promise = fetch("http://localhost:8000/users");
    return promise;
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

  function selectUser(userId) {
    setSelectedUserId(userId);
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => (res.status === 200 ? res.json() : undefined))
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
      <ContactPop />
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
        selectUser={selectUser}
      />
      <Form handleSubmit={updateList} />
      <Route path="/login" element={<Login handleSubmit={loginUser} />} />
      <ChakraProvider>
        {selectedUserId && <ProfileCard userId={selectedUserId} />}
      </ChakraProvider>
    </div>
  );
}

export default MyApp;

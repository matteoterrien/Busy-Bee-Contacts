import React, { useState } from "react";

function Form(props) {
  const [person, setPerson] = useState({
    first_name: "",
    last_name: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "last_name")
      setPerson({ first_name: person["first_name"], last_name: value });
    else setPerson({ name: value, last_name: person["last_name"] });
  }

  function submitForm() {
    props.handleSubmit(person);
    setPerson({ first_name: "", last_name: "" });
  }

  return (
    <form>
      <label htmlFor="first_name">First Name</label>
      <input
        type="text"
        name="first_name"
        id="first_name"
        value={person.first_name}
        onChange={handleChange}
      />
      <label htmlFor="last_name">Last Name</label>
      <input
        type="text"
        name="last_name"
        id="last_name"
        value={person.last_name}
        onChange={handleChange}
      />
      <input type="button" value="Submit" onClick={submitForm} />
    </form>
  );
}

export default Form;

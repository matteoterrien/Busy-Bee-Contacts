import React from "react";

function HomeHeader() {
  return (
    <thead>
      <tr>
        <th>Busy Bee Contacts</th>
      </tr>
    </thead>
  );
}

function HomeBody(props) {
  const rows = props.contactData.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.first_name}</td>
        <td>{row.last_namex}</td>
        <td>
          <button onClick={() => props.removeContact(index)}>Delete</button>
        </td>

        <td>
          <button onClick={() => props.selectContact(row._id)}>
            View Profile
          </button>
        </td>
      </tr>
    );
  });
  return <tbody>{rows}</tbody>;
}

function HomePage(props) {
  return (
    <table>
      <HomeHeader />
      <HomeBody
        contactData={props.contactData}
        removeContact={props.removeContact}
        selectContact={props.selectContact}
      />
    </table>
  );
}

export default HomePage;

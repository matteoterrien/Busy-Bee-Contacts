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
  const rows = props.characterData.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.name}</td>
        <td>{row.job}</td>
        <td>
          <button onClick={() => props.removeCharacter(index)}>Delete</button>
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
        characterData={props.characterData}
        removeCharacter={props.removeCharacter}
      />
    </table>
  );
}

export default HomePage;

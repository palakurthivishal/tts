import React from "react";
import ReactDOM from "react-dom";
import CountryProfile from "./CountryProfile";
import SearchCriteria from "./SearchCriteria";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <SearchCriteria />
      <br />
      <hr />
      <br />
      <CountryProfile />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

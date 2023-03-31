import { useState } from "react";
import MeteoWidget from "./components/MeteoWidget";

import "./App.css";

function App() {
  const [search, setSearch] = useState();
  const [city, setCity] = useState("paris");

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearch(city);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          value={city}
          onChange={(event) => setCity(event.currentTarget.value)}
        ></input>
      </form>
      <MeteoWidget city={search ? search : "paris"} />
    </>
  );
}

export default App;

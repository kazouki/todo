import React from "react";
import "./App.css";
import List from "./components/List";
import AddItem from "./components/AddItem";

function App() {
  return (
    <div className="App">
      <AddItem />
      <hr />
      <List listId={1} />
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";
import React from "react";
import Nav from "./components/Nav";
import Header from "./components/Header";
import Feed from "./components/Feed";
import PopUp from "./components/PopUp";

function App() {
  const [user, setUser] = useState(null);

  const userId = "1";

  const getUser = async () => { 
    try {
      const response = await fetch(`http://localhost:3000/users?user_uuid=${userId}`);
      const data = await response.json();
      setUser(data[0]);
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUser();
  }, [] );
  
  console.log(user);

  return (
    <div className="app">
      <Nav />
      <Header />
      <Feed />
      {/* <PopUp /> */}
    </div>
  );
}

export default App;

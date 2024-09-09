import React from "react";
import Login from "./components/Login";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />

      <div className="flex justify-center items-center h-screen bg-[#F3F4F6]">
        <Login />
      </div>
    </div>
  );
}

export default App;

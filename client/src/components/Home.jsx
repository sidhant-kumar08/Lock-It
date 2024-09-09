import React, { useState, useEffect } from "react";
import axios from "axios";
import PasswordList from "./PasswordList";
import AddPassword from "./AddPassword";
import Navbar from "./Navbar";
import AOS from 'aos'
import 'aos/dist/aos.css';


function Home() {
  const [passwords, setPasswords] = useState([]);
  const [error, setError] = useState(null);
  const [editPassword, setEditPassword] = useState(null); // State for password being edited

  // Function to fetch passwords from the backend

  useEffect(() => {
    AOS.init();
  }, [])

  const fetchPasswords = async () => {
    try {
      const response = await axios.get("https://lock-it-backend.onrender.com/manage/", {
        withCredentials: true,
      });
      setPasswords(response.data);
    } catch (error) {
      setError("Failed to fetch passwords");
      console.error(error);
    }
  };

  // Fetch passwords when the component mounts
  useEffect(() => {
    fetchPasswords();
  }, []);

  // Function to set the password to be edited
  const handleEdit = (password) => {
    setEditPassword(password); // Pass the password to the form for editing
  };

  return (
    <>
      <Navbar />

      <div className="mt-4" data-aos='fade-down'>
        <AddPassword
          onPasswordAdded={fetchPasswords}
          editPassword={editPassword} // Pass editPassword to AddPassword
          setEditPassword={setEditPassword} // Pass setEditPassword to clear the form after edit
        />
        <PasswordList
          passwords={passwords}
          onDelete={fetchPasswords}
          onEdit={handleEdit} // Pass handleEdit to PasswordList
          error={error}
        />
      </div>
    </>
  );
}

export default Home;

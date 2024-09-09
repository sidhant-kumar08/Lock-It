import React, { useState } from "react";
import axios from "axios";
import { Edit, EyeIcon, KeyIcon, Trash } from "lucide-react";

function PasswordList({ passwords, onDelete, onEdit, error }) {
  const [showPasswords, setShowPasswords] = useState({});

  const handleDelete = async (id) => {
    try {
      await axios.post(`http://localhost:4000/manage/delete/${id}`, {}, {
        withCredentials: true,
      });
      onDelete(); // Trigger refetch after deletion
    } catch (error) {
      console.error(error);
    }
  };

  const handleEyeClick = (id) => {
    setShowPasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      <div className="flex justify-center items-center mb-6">
        <KeyIcon className="mr-2" />
        <h1 className="text-xl font-semibold font-[geist]">Saved Passwords</h1>
      </div>

      {error && <p>{error}</p>}
      <div className="p-6 border border-zinc-300 rounded-lg shadow-md bg-white">
        <div className="md:flex-row gap-4 flex-col flex flex-wrap justify-center">
          {passwords.map((password) => (
            <div
              className="border border-zinc-300 shadow-md p-6 md:w-1/5 w-72 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              key={password._id}
            >
              <h1 className="text-xl font-semibold uppercase mb-2 text-gray-800">
                {password.title}
              </h1>
              <h2 className="text-sm text-gray-600 mb-1">
                Username: {password.username}
              </h2>
              <h2 className="text-sm text-gray-600 mb-4">
                Password: {showPasswords[password._id] ? password.password : "******"}
              </h2>
              <div className="flex justify-between items-center">
                <button onClick={() => handleEyeClick(password._id)} className="bg-zinc-300 hover:bg-zinc-400 text-gray-800 px-3 py-1 rounded-lg">
                  <EyeIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onEdit(password)}  // Trigger edit when clicked
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(password._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                >
                  <Trash className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default PasswordList;

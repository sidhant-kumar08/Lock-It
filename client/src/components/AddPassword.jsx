import React, { useState, useEffect } from "react";
import axios from "axios";
import { LockIcon, PlusIcon, Edit } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddPassword({ onPasswordAdded, editPassword, setEditPassword }) {
  const [formData, setFormData] = useState({
    title: "",
    username: "",
    password: "",
  });

  // Set form data when editPassword is populated
  useEffect(() => {
    if (editPassword) {
      setFormData({
        title: editPassword.title,
        username: editPassword.username,
        password: editPassword.password,
      });
    }
  }, [editPassword]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editPassword) {
        // Edit password functionality
        await axios.put(`https://lock-it-backend.onrender.com/manage/update/${editPassword._id}`, formData, {
          withCredentials: true,
        });
        setEditPassword(null); // Clear the form after editing
      } else {
        // Add password functionality
        await axios.post("https://lock-it-backend.onrender.com/manage/add", formData, {
          withCredentials: true,
        });
      }

      setFormData({ title: "", username: "", password: "" });
      onPasswordAdded(); // Refetch the list after adding or editing
    } catch (error) {
      console.error("Failed to save password", error);
    }
  };



  return (
    <div className="py-6">
      <div className="flex justify-center items-center mb-8">
        <LockIcon className="h-8 w-8 text-black mr-2" />
        <h1 className="text-3xl font-semibold text-gray-800">Password Manager</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 p-4 justify-center items-center">
        <div className="w-full md:w-1/3">
          <label htmlFor="title" className="block font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="rounded-lg border border-zinc-300 px-3 py-2 w-full text-gray-800"
            placeholder="Enter title"
          />
        </div>

        <div className="w-full md:w-1/3">
          <label htmlFor="username" className="block font-medium text-gray-700 mb-1">
            Username or Email
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="rounded-lg border border-zinc-300 px-3 py-2 w-full text-gray-800"
            placeholder="Enter username or email"
          />
        </div>

        <div className="w-full md:w-1/3">
          <label htmlFor="password" className="block font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="rounded-lg border border-zinc-300 px-3 py-2 w-full text-gray-800"
            placeholder="Enter password"
          />
        </div>
      </form>

      <div className="flex justify-center mt-4">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 w-60 bg-black text-white flex justify-center items-center hover:bg-zinc-700 transition-all ease-linear rounded-xl hover:scale-105 duration-150"
          type="submit"
        >
          {editPassword ? "Update" : "Add"}
          {editPassword ? (
            <Edit className="ml-2 transition-all duration-150" />
          ) : (
            <PlusIcon className="ml-2 group-hover:rotate-90 transition-all duration-150" />
          )}
        </button>
      </div>

      <div className="flex justify-center items-center mt-6 w-full">
        <div className="h-[1px] bg-zinc-300 w-full"></div>
      </div>

      
    </div>
  );
}

export default AddPassword;

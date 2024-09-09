import React, { useState,useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import AOS from 'aos'
import 'aos/dist/aos.css';

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    AOS.init();
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://lock-it-backend.onrender.com/auth/register",
        formData
      );
      console.log(response);
    } catch (error) {
      setError("registration failed, try again");
      console.error("Registration failed", error);
    }
  };

  return (
    <>
      <div className=''>
        <Navbar />
      </div>
      <div className="font-[geist] bg-[#F3F4F6] rounded-xl h-screen flex justify-center" data-aos='fade-down'>
        <div className="">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 mt-6 md:mt-10 rounded-xl p-10 md:px-16 md:py-14 bg-white border border-zinc-300"
          >
            {error && (
              <p className="text-red-500">An error occured, Try again</p>
            )}

            <div className="flex justify-center flex-col items-center">
              <h1 className="text-4xl font-bold ">Register</h1>
              <h6 className="text-sm text-zinc-500">Create an account</h6>
            </div>

            <div>
              <label htmlFor="fullName" className="block">
                Full Name:
              </label>
              <input
                className=" rounded-lg border border-zinc-300 px-2 py-1"
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="username" className="block">
                Username:
              </label>
              <input
                className=" rounded-lg border border-zinc-300 px-2 py-1"
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="email" className="block">
                Email:
              </label>
              <input
                className=" rounded-lg border border-zinc-300 px-2 py-1"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="block">
                Password:
              </label>
              <input
                className=" rounded-lg border border-zinc-300 px-2 py-1"
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <button
                type="submit"
                className="px-3 py-2 mt-2 w-full justify-center hover:bg-zinc-800 hover:scale-105 transition ease-linear shadow-lg bg-black rounded-lg uppercase text-white font-normal flex items-center gap-1"
              >
                Register
              </button>
            </div>

            <div>
              <h6 className="text-zinc-600 font-normal text-sm">
                Already have an account?{" "}
                <Link to="/">
                  <span className="text-zinc-900 font-normal hover:underline">
                    {" "}
                    Login
                  </span>
                </Link>
              </h6>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;

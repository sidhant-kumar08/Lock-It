import React, { useState,useEffect } from "react";
import { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import AOS from 'aos'
import 'aos/dist/aos.css';

function Login() {

  useEffect(() => {
    AOS.init();
  }, [])

  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);
  const { isAuthenticated } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://lock-it-backend.onrender.com/auth/login",
        formData,
        {
          withCredentials: true,
        }
      );

      console.log(response);
      if (response.status === 200) {
        setIsAuthenticated(true);
        navigate("/home");
      }
    } catch (error) {
      setError("Login failed. Please check your credentials.");
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="font-[geist] bg-white rounded-xl -mt-16" data-aos='fade-down' >
        <div className="">
          <form
            onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-xl p-10 md:px-24 md:py-14  md:border md:border-zinc-300"
          >

            {error && <p className="text-red-500 flex items-center justify-center">Login failed</p>}

            <div className="justify-center flex flex-col">
              <h1 className="text-3xl overflow-hidden font-semibold">Login</h1>
              <h6 className="text-sm text-zinc-500">Enter your credentials to login</h6>
            </div>
            <div>
              <label htmlFor="email" className="block">
                Email{" "}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
                className=" rounded-lg border border-zinc-300 px-2 py-1"
              />
            </div>

            <div>
              <label htmlFor="password" className="block">
                Password{" "}
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                value={formData.password}
                className=" rounded-lg border border-zinc-300 px-2 py-1"
              />
              <div className="overflow-hidden">
              <button
                type="submit"
                className="px-3 py-2 mt-4 w-full justify-center hover:bg-zinc-800 hover:scale-105 transition ease-linear shadow-lg bg-black rounded-lg uppercase text-white font-normal flex items-center gap-1"
              >
                Login
                <img src="./login.svg" alt="" />
              </button>
            </div>

            
            </div>

            <div>
              <h6 className="text-zinc-600 font-normal text-sm">Don't have an account?  <Link to='/register'><span className="text-zinc-900 font-normal hover:underline"> Register</span></Link></h6>
            </div>

            
            
          </form>
          
        </div>
      </div>
    </>
  );
}

export default Login;

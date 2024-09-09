import React, { useContext,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LockIcon } from 'lucide-react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'
import AOS from 'aos'
import 'aos/dist/aos.css';

function Navbar() {


  useEffect(() => {
    AOS.init();
  }, [])

  const navigate  = useNavigate()

  const handleLogout = async () => {
    try {
      console.log('clicked')
      const response = await axios.post('http://localhost:4000/auth/logout', {}, {
        withCredentials: true
      })

      if(response.status === 200){
        navigate('/');
        setIsAuthenticated(false)
        console.log(response)
      }

    } catch (error) {
      console.log(error)
    }
  }

  const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext)
  return (
    <>
      <nav className=" border-b border-zinc-300" data-aos='fade-down'>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
          <LockIcon className='' />
            <span className="text-xl font-bold">{`</Lock It>`}</span>
          </Link>
        </div>

        {isAuthenticated ? <div>
          <button onClick={handleLogout} className='px-3 py-1 bg-black text-white rounded-xl hover:scale-105 transition ease-linear hover:bg-zinc-600'>Logout</button>
        </div> : ""}
      </div>
    </nav>
    </>
  )
}

export default Navbar

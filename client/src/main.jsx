import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home.jsx'
import AuthProvider from './context/AuthContext.jsx'
import AuthenticatedRoute from './AuthenticatedRoute.jsx'
import Register from './components/Register.jsx'



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    
  },
  {
    path: '/register',
    element: <Register />
  },
 
  {
      path: '/home',
      element: <AuthenticatedRoute element={<Home />} />
  }
])


createRoot(document.getElementById('root')).render(
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
)

import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FaHeart, FaUser } from 'react-icons/fa'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-2">
              <FaHeart className="text-primary text-2xl" />
              <span className="font-bold text-2xl text-slate-900">CAREBRIDGE</span>
            </Link>
          </div>

          <div className="flex items-center space-4">
            {!user ? (
              <>
                <Link to="/login" className="px-4 py-2 text-slate-700 hover:text-primary">
                  Login
                </Link>
                <Link to="/signup" className="px-4 py-2 bg-primary text-white rounded-lg shadow-sm hover:bg-blue-600">
                  Signup
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="px-4 py-2 text-slate-700 hover:text-primary">
                  Dashboard
                </Link>
                <Link to="/upload-report" className="px-4 py-2 bg-secondary text-white rounded-lg shadow-sm hover:bg-indigo-600">
                  Upload Report
                </Link>
                <Link to="/medicines" className="px-4 py-2 text-slate-700 hover:text-primary">
                  Medicines
                </Link>
                <div className="flex items-center space-2 px-3 py-2 bg-slate-100 rounded-lg">
                  <FaUser className="text-slate-600" />
                  <span className="text-slate-700">{user.name}</span>
                </div>
                <button onClick={handleLogout} className="px-4 py-2 text-slate-700 hover:text-red-600">
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

import React, { createContext, useContext, useMemo, useState } from 'react'
import axios from 'axios'

const AuthContext = createContext()
const API_BASE_URL = 'http://localhost:5000/api'

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user'))
  } catch {
    return null
  }
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [loading, setLoading] = useState(false)

  const api = useMemo(() => {
    const client = axios.create({ baseURL: API_BASE_URL })

    client.interceptors.request.use((config) => {
      const activeToken = token || localStorage.getItem('token')
      if (activeToken) {
        config.headers.Authorization = `Bearer ${activeToken}`
      }
      return config
    })

    client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          setUser(null)
          setToken(null)
          localStorage.removeItem('user')
          localStorage.removeItem('token')
        }
        return Promise.reject(error)
      }
    )

    return client
  }, [token])

  const saveSession = (data) => {
    setUser(data.user)
    setToken(data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    localStorage.setItem('token', data.token)
  }

  const login = async (email, password) => {
    setLoading(true)
    try {
      const res = await api.post('/auth/login', { email, password })
      saveSession(res.data)
      return { success: true }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Login failed' }
    } finally {
      setLoading(false)
    }
  }

  const signup = async (name, email, password) => {
    setLoading(true)
    try {
      const res = await api.post('/auth/signup', { name, email, password })
      saveSession(res.data)
      return { success: true }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Signup failed' }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ user, token, api, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

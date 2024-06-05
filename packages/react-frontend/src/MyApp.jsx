import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import HomePage from './HomePage'
import Contact from './Contact'
import Edit from './ContactEdit'
import CreateContact from './CreateContact'
import LoginPage from './Login'
import SignupPage from './Signup'
import LoginError from './LoginError'
import SignUpError from './SignUpError'
import ForgotPassword from './ForgotPassword'
import InvalidInputError from './InvalidInputError'
import { useAuth } from './AuthProvider' // Import useAuth from AuthProvider

const MyApp = () => {
    const [userID, setUserID] = useState('')
    const [contacts, setContacts] = useState([])
    const [favoriteContacts, setFavoriteContacts] = useState([])
    const [token, setToken] = useState('INVALID_TOKEN')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    const { setIsAuthenticated } = useAuth()

    const fetchContacts = () => {
        return fetch('http://localhost:8000/contacts')
    }

    const fetchFavoriteContacts = async () => {
        const res = await fetch('http://localhost:8000/contacts/favorite')
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`)
        }
        return await res.json()
    }

    const postContact = (person) => {
        return fetch('http://localhost:8000/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(person),
        })
            .then((res) => {
                if (res.status === 201) {
                    return res.json()
                } else {
                    console.error('ERROR: Returned Status', res.status)
                }
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const deleteContact = (id) => {
        return fetch(`http://localhost:8000/contacts/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                if (res.status === 404) {
                    console.log('Did not find contact')
                } else if (res.status !== 204) {
                    console.log('ERROR: Returned Status ', res.status)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const updateList = (person) => {
        postContact(person)
            .then((promise) => {
                if (promise) {
                    setContacts((prevContacts) => [...prevContacts, promise])
                    const id = promise._id
                    navigate(`/contact/${id}`)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const updateFavorites = () => {
        fetchFavoriteContacts()
            .then((json) => {
                if (json) {
                    setFavoriteContacts(
                        sortContactsByFirstName(json['contact_list']),
                    )
                } else {
                    setContacts(null)
                }
            })
            .catch((error) => {
                console.error('Failed to fetch favorite contacts:', error)
            })
    }

    const removeOneContact = (id) => {
        const index = contacts.findIndex((contact) => contact._id === id)
        const favIndex = favoriteContacts.findIndex(
            (contact) => contact._id === id,
        )
        deleteContact(id)
            .then(() => {
                const updated = contacts.filter((_, i) => i !== index)
                setContacts(updated)
                if (favIndex !== -1) {
                    const favoriteUpdate = favoriteContacts.filter(
                        (_, i) => i !== favIndex,
                    )
                    setFavoriteContacts(favoriteUpdate)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const loginUser = async (creds) => {
        try {
            const response = await fetch(`${API_PREFIX}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(creds),
            })
            if (response.status === 200) {
                const data = await response.json()
                localStorage.setItem('token', data.token)
                setToken(data.token)
                setMessage('Login successful')
                setIsAuthenticated(true)
                navigate('/')
            } else {
                setMessage(
                    `Login Error ${response.status}: ${response.statusText}`,
                )
            }
        } catch (error) {
            setMessage(`Login Error: ${error.message}`)
        }
    }

    const signUpUser = async (creds) => {
        try {
            const response = await fetch(`${API_PREFIX}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(creds),
            })
            if (response.status === 201) {
                setMessage('Sign up successful')
                fetchContacts()
            } else {
                setMessage(
                    `Sign up Error ${response.status}: ${response.statusText}`,
                )
            }
        } catch (error) {
            setMessage(`Sign up Error: ${error.message}`)
        }
    }

    const sortContactsByFirstName = (contacts) => {
        return contacts
            .slice()
            .sort((a, b) => a.first_name.localeCompare(b.first_name))
    }

    useEffect(() => {
        fetchContacts()
            .then((res) => (res.status === 200 ? res.json() : undefined))
            .then((json) => {
                if (json) {
                    setContacts(sortContactsByFirstName(json['contact_list']))
                } else {
                    setContacts(null)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    useEffect(() => {
        fetchFavoriteContacts()
            .then((json) => {
                if (json) {
                    setFavoriteContacts(
                        sortContactsByFirstName(json['contact_list']),
                    )
                } else {
                    setContacts(null)
                }
            })
            .catch((error) => {
                console.error('Failed to fetch favorite contacts:', error)
            })
    }, [])

    return (
        <div id="page">
            <Routes>
                <Route
                    exact
                    path="/"
                    element={
                        <PrivateRoute>
                            <HomePage
                                contactData={contacts}
                                favoriteContactData={favoriteContacts}
                            />
                        </PrivateRoute>
                    }
                />
                <Route
                    exact
                    path="/contact/:id"
                    element={
                        <PrivateRoute>
                            <Contact handleSubmit={updateFavorites} />
                        </PrivateRoute>
                    }
                />
                <Route
                    exact
                    path="/edit/:id"
                    element={
                        <PrivateRoute>
                            <Edit handleSubmit={removeOneContact} />
                        </PrivateRoute>
                    }
                />
                <Route
                    exact
                    path="/createContact/"
                    element={
                        <PrivateRoute>
                            <CreateContact handleSubmit={updateList} />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/signup"
                    element={<SignupPage handleSubmit={signUpUser} />}
                />
                <Route
                    path="/login"
                    element={<LoginPage handleSubmit={loginUser} />}
                />
                <Route exact path="/loginerror" element={<LoginError />} />
                <Route exact path="/signuperror" element={<SignUpError />} />
                <Route
                    exact
                    path="/forgotpassword"
                    element={<ForgotPassword />}
                />
                <Route
                    exact
                    path="/invalidinputerror"
                    element={<InvalidInputError />}
                />
            </Routes>
        </div>
    )
}

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth()
    return isAuthenticated ? children : <Navigate to="/login" />
}

export default MyApp

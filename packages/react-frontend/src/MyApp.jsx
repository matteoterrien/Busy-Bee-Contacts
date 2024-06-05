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
        const promise = fetch(`http://localhost:8000/contacts?userID=${userID}`)
        return promise
    }

    const fetchFavoriteContacts = async () => {
        const res = await fetch(
            `http://localhost:8000/contacts/favorite?userID=${userID}`,
        )
        if (!res.ok) {
            throw new Error(`Error: ${res.status}`)
        }
        return await res.json()
    }

    const postContact = (person) => {
        return fetch('http://localhost:8000/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...person,
                userID: userID,
            }),
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

    const updateContacts = () => {
        fetchContacts()
            .then((json) => {
                if (json && json['contact_list']) {
                    setContacts(sortContactsByFirstName(json['contact_list']))
                } else {
                    setContacts([])
                }
            })
            .catch((error) => {
                console.error('Failed to fetch contacts:', error)
            })
    }

    const updateFavorites = () => {
        fetchFavoriteContacts()
            .then((json) => {
                if (json && json['contact_list']) {
                    setFavoriteContacts(
                        sortContactsByFirstName(json['contact_list']),
                    )
                } else {
                    setFavoriteContacts([])
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
    }, [userID])

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
    }, [userID])

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
                <Route path="/signup" element={<SignupPage />} />
                <Route
                    path="/login"
                    element={
                        <LoginPage
                            handleSubmit={(event) => {
                                setUserID(event)
                                updateContacts()
                                updateFavorites()
                            }}
                        />
                    }
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

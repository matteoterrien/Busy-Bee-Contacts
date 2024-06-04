import React, { useState, useEffect } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
} from 'react-router-dom'
import HomePage from './HomePage'
import Contact from './Contact'
import Edit from './ContactEdit'
import CreateContact from './CreateContact'
import LoginPage from './Login'

function MyApp() {
    const [contacts, setContacts] = useState([])
    const [favoriteContacts, setFavoriteContacts] = useState([])
    const INVALID_TOKEN = 'INVALID_TOKEN'
    const [token, setToken] = useState(INVALID_TOKEN)
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    function loginUser(creds) {
        const promise = fetch(`${API_PREFIX}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(creds),
        })
            .then((response) => {
                if (response.status === 200) {
                    response.json().then((payload) => setToken(payload.token))
                    setMessage(`Login successful; auth token saved`)
                } else {
                    setMessage(
                        `Login Error ${response.status}: ${response.data}`,
                    )
                }
            })
            .catch((error) => {
                setMessage(`Login Error: ${error}`)
            })
    }

    function fetchContacts() {
        const promise = fetch('http://localhost:8000/contacts')
        return promise
    }

    const fetchFavoriteContacts = async () => {
        const res = await fetch('http://localhost:8000/contacts/favorite')
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`)
        }
        return await res.json()
    }

    function postContact(person) {
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

    function deleteContact(id) {
        const promise = fetch(`http://localhost:8000/contacts/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            code: 204,
        })
            .then((res) => {
                if (res.status == 404) {
                    console.log('Did not find contact')
                } else if (res.status != 204) {
                    console.log('ERROR: Returned Status ', res.status)
                }
            })
            .catch((error) => {
                console.log(error)
            })
        return promise
    }

    function addAuthHeader(otherHeaders = {}) {
        if (token === INVALID_TOKEN) {
            return otherHeaders
        } else {
            return {
                ...otherHeaders,
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }
    }

    function updateList(person) {
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

    function removeOneContact(index) {
        deleteContact(index)
            .then((promise) => {
                const updated = contacts.filter((contact, i) => {
                    return i !== index
                })
                setContacts(updated)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    function loginUser(creds) {
        console.log('Logging in with creds', creds)
        console.log('API_PREFIX', API_PREFIX)
        const promise = fetch(`${API_PREFIX}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(creds),
        })
            .then((response) => {
                if (response.status === 200) {
                    setMessage(`Login successful; auth token saved`)
                    fetchContacts()
                } else {
                    setMessage(
                        `Login Error ${response.status}: ${response.data}`,
                    )
                }
            })
            .catch((error) => {
                setMessage(`Login Error: ${error}`)
            })
    }

    function selectContact(userId) {
        setSelectedContactId(userId)
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
                        <HomePage
                            contactData={contacts}
                            favoriteContactData={favoriteContacts}
                            removeCharacter={removeOneContact}
                        />
                    }
                />
                <Route exact path="/contact/:id" element={<Contact />} />
                <Route
                    exact
                    path="/edit/:id"
                    element={<Edit handleSubmit={removeOneContact} />}
                />
                <Route
                    exact
                    path="/createContact/"
                    element={<CreateContact handleSubmit={updateList} />}
                />
                <Route exact path="/deleteContact/:id" element={<HomePage />} />
                {
                    <Route
                        path="/login"
                        element={<LoginPage handleSubmit={loginUser} />}
                    />
                }
            </Routes>
        </div>
    )
}

export default MyApp

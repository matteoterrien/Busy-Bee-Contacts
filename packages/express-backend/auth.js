import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import User from './models/user.js'

const creds = []

export function registerUser(req, res) {
    const { full_name, username, pwd } = req.body
    if (!username || !pwd || !full_name) {
        res.status(400).send('Bad request: Invalid input data.')
    } else {
        mongoose
            .model('User')
            .findOne({ username: username })
            .then((retrievedUser) => {
                if (retrievedUser) {
                    res.status(409).send('Username already taken')
                } else {
                    mongoose
                        .model('User')
                        .create({
                            username: username,
                            password: pwd,
                        })
                        .then(() => {
                            res.status(201).send()
                        })
                        .catch(() => {
                            res.status(500).send('Internal Server Error')
                        })
                }
            })
    }
}

export function authenticateUser(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        console.log('No token received')
        res.status(401).end()
    } else {
        jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {
            if (decoded) {
                next()
            } else {
                console.log('JWT error:', error)
                res.status(401).end()
            }
        })
    }
}

export function loginUser(req, res) {
    const { username, pwd } = req.body
    mongoose
        .model('User')
        .findOne({ username: username })
        .then((retrievedUser) => {
            if (!retrievedUser) {
                res.status(401).send('Unauthorized')
            } else {
                mongoose
                    .model('User')
                    .findOne({ _id: retrievedUser.id })
                    .select('password')
                    .then((user) => {
                        const password = user.password
                        if (password == pwd) {
                            res.status(200).send(user._id)
                        } else {
                            res.status(401).send('Unauthorized')
                        }
                    })
                    .catch(() => {
                        res.status(401).send('Unauthorized')
                    })
            }
        })
        .catch(() => {
            res.status(500).send('Internal Server Error')
        })
}

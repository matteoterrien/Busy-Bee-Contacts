import {
    Center,
    ChakraProvider,
    Input,
    Stack,
    Image,
    Heading,
    Text,
    Button,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './AuthProvider'

function LoginPage({ handleSubmit }) {
    const [creds, setCreds] = useState({
        username: '',
        pwd: '',
    })

    const API_PREFIX = 'http://localhost:8000'
    const [message, setMessage] = useState('')
    const navigateTo = useNavigate()
    const { setIsAuthenticated } = useAuth()

    function navigateToHomePage(userID) {
        handleSubmit(userID)
        navigateTo('/')
    }

    function navigateToLoginError() {
        navigateTo('/loginerror')
    }

    function navigateToForgotPassword() {
        navigateTo('/forgotpassword')
    }

    async function loginUser(creds) {
        console.log('loginUser called')
        try {
            const response = await fetch(`${API_PREFIX}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(creds),
            })

            if (response.status === 200) {
                response.json().then((data) => {
                    setMessage('Login successful')
                    setIsAuthenticated(true)
                    navigateToHomePage(data)
                })
            } else {
                console.log('Login failed')
                const errorData = await response.json()
                setMessage(
                    `Login Error ${response.status}: ${errorData.message}`,
                )
                navigateToLoginError()
            }
        } catch (error) {
            console.log('Login error:', error)
            setMessage('Login Error: Network issue or server error')
            navigateToLoginError()
        }
    }

    function handleLoginClick() {
        loginUser(creds)
    }

    return (
        <ChakraProvider resetCSS>
            <Center h="100vh" className="border">
                <Stack boxShadow="md" bg="#fcfcfa" p="20" rounded="md">
                    <Stack isInline>
                        <Image
                            src="https://us.123rf.com/450wm/kaissaart/kaissaart1807/kaissaart180700038/114801772-bee-flat-design-illustration-simple-vector-icon.jpg?ver=6"
                            maxW="100px"
                            mx="auto"
                        />
                    </Stack>
                    <Heading as="h1"> Log In </Heading>
                    <Text fontSize="lg" className="secText">
                        Please Log in with your Busy Bee Contact Information.
                    </Text>
                    <Stack>
                        <Input
                            bg="lightgrey"
                            name="email"
                            type="email"
                            placeholder="Email"
                            onChange={(e) =>
                                setCreds({ ...creds, username: e.target.value })
                            }
                        />
                        <Input
                            bg="lightgrey"
                            name="password"
                            type="password"
                            placeholder="Password"
                            onChange={(e) =>
                                setCreds({ ...creds, pwd: e.target.value })
                            }
                        />
                        <Button className="but" onClick={handleLoginClick}>
                            Login
                        </Button>
                    </Stack>

                    <Stack justify="center" className="secText" spacing="3">
                        <Text align="center">
                            <span>Don't have an account? </span>
                            <Button
                                colorScheme="purple"
                                variant="link"
                                onClick={() => navigateTo('/signup')}
                            >
                                Sign Up
                            </Button>
                        </Text>
                        <Button
                            colorScheme="purple"
                            variant="link"
                            onClick={() => navigateTo('/forgotpassword')}
                        >
                            Forgot Password?
                        </Button>
                    </Stack>
                </Stack>
            </Center>
        </ChakraProvider>
    )
}
export default LoginPage

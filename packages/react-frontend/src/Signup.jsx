//import React from "react";
import {
  Center,
  ChakraProvider,
  Input,
  Stack,
  Image,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'

function SignupPage(props) {
  const navigateTo = useNavigate()
  const [creds, setCreds] = useState({
    full_name: '',
    username: '',
    pwd: '',
  })
  const API_PREFIX = 'http://localhost:8000'
  const [message, setMessage] = useState('')

  function navigateToSignup() {
    navigateTo('/signup')
  }

  function navigateToHomePage() {
    navigateTo('/')
  }

  function SignUpUser(creds) {
    const promise = fetch(`${API_PREFIX}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(creds),
    })
        .then((response) => {
            if (response.status === 201) {
                setMessage(
                    `Signup successful for user: ${creds.username};`,
                )
                navigateToHomePage()
            } else if (response.status === 409) {
                setMessage(
                    `Signup Error ${response.status}: Username already taken`,
                )
                navigateToSignup()
            }
            else {
                setMessage(
                    `Signup Error ${response.status}: ${response.data}`,
                )
            }
        })
        .catch((error) => {
            setMessage(`Signup Error: ${error}`)
        })

    return promise
  }

  function handleSignUpClick() {
    SignUpUser(creds)
}

  return (
    <ChakraProvider resetCSS>
      <Center h="100vh" className="border">
        <Stack boxShadow="large" bg="white" p="20" rounded="md">
          <Stack isInline>
            <Image
              src="https://us.123rf.com/450wm/kaissaart/kaissaart1807/kaissaart180700038/114801772-bee-flat-design-illustration-simple-vector-icon.jpg?ver=6"
              maxW="90px"
              mx="auto"
            />
          </Stack>
          <Heading as="h1"> Sign Up </Heading>
          <Text fontSize="lg" className="secText">
            Please enter the information to register for Busy Bee Contacts.
          </Text>
          {/* Login Check For NEW Email */}
                <Stack>
                  <Input
                    bg="lightgrey"
                    name="name"
                    type="name"
                    placeholder="Full Name"
                    onChange={(e) =>
                      setCreds({ ...creds, full_name: e.target.value })
                  }
                  />
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

                  <Button className="but" onClick={handleSignUpClick}>
                    Sign Up
                  </Button>
                </Stack>

          <Stack justify="center" className="secText" spacing="3">
            <Text align="center">
              <span>Already have an account? </span>
              <Button colorScheme="purple" variant="link" onClick={() => navigateTo('/login')}>
                Log In
              </Button>
            </Text>
          </Stack>
        </Stack>
      </Center>
    </ChakraProvider>
  );
}

export default SignupPage;
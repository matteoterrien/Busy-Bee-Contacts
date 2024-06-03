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
import React, { useState } from "react";
import HomePage from "./HomePageV2";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function LoginPage(props) {
    const [creds, setCreds] = useState({
      username: "",
      pwd: "",
    });
    
    const API_PREFIX = "http://localhost:8000";

    const [message, setMessage] = useState("");
    const navigateTo = useNavigate();

    function navigateToHomePage() {
      navigateTo('/')
    }    

    function loginUser(creds) {
      console.log("loginUser2 called")
      const promise = fetch(`${API_PREFIX}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(creds),
      })
        .then((response) => {
          if (response.status === 200) {
            setMessage("Login successful");
            navigateToHomePage();
          } else {
            console.log("Login failed");
            setMessage(`Login Error ${response.status}: ${response.data}`);
          }
        })
    
      return promise;
    }
    
    function signupUser(creds) {
      const promise = fetch(`${API_PREFIX}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(creds),
      })
        .then((response) => {
          if (response.status === 201) {
            response.json().then((payload) => setToken(payload.token));
            setMessage(
              `Signup successful for user: ${creds.username}; auth token saved`,
            );
          } else {
            setMessage(`Signup Error ${response.status}: ${response.data}`);
          }
        })
        .catch((error) => {
          setMessage(`Signup Error: ${error}`);
        });
    
      return promise;
    }    

    function handleLoginClick() {
      //console.log("button clicked")
      loginUser(creds)
    }

     return (
        <ChakraProvider resetCSS>
          <Center h="100vh" className="border">
            <Stack boxShadow="md" bg="white" p="20" rounded="md">
              <Stack isInline>
                <Image
                  src="https://us.123rf.com/450wm/kaissaart/kaissaart1807/kaissaart180700038/114801772-bee-flat-design-illustration-simple-vector-icon.jpg?ver=6"
                  maxW="90px"
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
                  onChange={(e) => setCreds({ ...creds, username: e.target.value })}
                />
                <Input
                  bg="lightgrey"
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setCreds({ ...creds, pwd: e.target.value })}
                />
                <Button className="but" onClick={handleLoginClick}>Login</Button>
              </Stack>
    
              <Stack justify="center" className="secText" spacing="3">
                <Text align="center">
                  <span>Don't have an account? </span>
                  <Button colorScheme="white" variant="link">
                    Sign Up
                  </Button>
                </Text>
                <Button colorScheme="white" variant="link">
                  Forgot Password?
                </Button>
              </Stack>
            </Stack>
          </Center>
        </ChakraProvider>
      );
}
export default LoginPage;

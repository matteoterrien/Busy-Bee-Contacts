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
import { Formik, Form } from "formik";
import React, { useState } from "react";

function LoginPage(props) {
    const [creds, setCreds] = useState({
      username: "",
      pwd: "",
    });

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
          <Text fontsize="lg" className="secText">
            Please Log in with your Busy Bee Contact Information.
          </Text>

          <Formik
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                console.log(values);
                setSubmitting(false);
              }, 1000);
            }}
            initialValues={{ email: "", password: "" }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Stack>
                  <Input
                    bg="lightgrey"
                    name="email"
                    type="email"
                    placeholder="Email"
                  />
                  <Input
                    bg="lightgrey"
                    name="password"
                    type="password"
                    placeholder="Password"
                  />
                  <Button
                    isLoasding={isSubmitting}
                    loadingText="Whispering to our servers"
                    className="but"
                  >
                    Login
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>

          <Stack justify="center" className="secText" spacing="3">
            <Text align="center">
              <span>Don't have an account? </span>
              <Button colorScheme="purple" variant="link">
                Sign Up
              </Button>
            </Text>
            <Button colorScheme="purple" variant="link">
              Forgot Password?
            </Button>
          </Stack>
        </Stack>
      </Center>
    </ChakraProvider>
  );
  
    function handleChange(event) {
      const { name, value } = event.target;
      switch (name) {
        case "username":
          setCreds({ ...creds, username: value });
          break;
        case "password":
          setCreds({ ...creds, pwd: value });
          break;
      }
    }
  
    function submitForm() {
      props.handleSubmit(creds);
      setCreds({ username: "", pwd: "" });
    }
  
  function loginUser(creds) {
    const promise = fetch(`${API_PREFIX}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    })
      .then((response) => {
        if (response.status === 200) {
          response.json().then((payload) => setToken(payload.token));
          setMessage(`Login successful; auth token saved`);
        } else {
          setMessage(`Login Error ${response.status}: ${response.data}`);
        }
      })
      .catch((error) => {
        setMessage(`Login Error: ${error}`);
      });
  
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
}
export default LoginPage;

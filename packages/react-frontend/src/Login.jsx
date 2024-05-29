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
              <Text fontSize="lg" className="secText">
                Please Log in with your Busy Bee Contact Information.
              </Text>
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
                <Button className="but">Login</Button>
              </Stack>
    
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
}
export default LoginPage;

import React from "react";
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

export default function LoginPage() {
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
          <Text fontsize="lg" className="secText">
            Please enter the information to register for Busy Bee Contacts.
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
                    name="name"
                    type="name"
                    placeholder="Full Name"
                  />
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
                    Sign Up
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>

          <Stack justify="center" className="secText" spacing="3">
            <Text align="center">
              <span>Already have an account? </span>
              <Button colorScheme="purple" variant="link">
                Log In
              </Button>
            </Text>
          </Stack>
        </Stack>
      </Center>
    </ChakraProvider>
  );
}

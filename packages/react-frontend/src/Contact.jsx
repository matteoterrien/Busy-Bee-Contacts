import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  ChakraProvider,
  Box,
  Stack,
  Heading,
  Text,
  Button,
  AvatarGroup,
  Avatar,
  Icon,
} from "@chakra-ui/react";
import {
  ArrowBackIcon,
  EditIcon,
  StarIcon,
  ExternalLinkIcon,
  PhoneIcon,
  EmailIcon,
  CalendarIcon,
  AtSignIcon,
} from "@chakra-ui/icons";
import "./main.css"

function Contact() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);

  function updateContact(contact) {
    const id = contact._id;
    const promise = fetch("http://localhost:8000/contacts", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id, contact),
      code: 201,
    })
      .then((res) => {
        if (res.status == 201) {
          return res.json();
        } else {
          console.log("ERROR: Returned Status ", res.status);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return promise;
  }

  useEffect(() => {
    fetch(`http://localhost:8000/contacts/${id}`)
      .then((res) => res.json())
      .then((data) => setContact(data["contact_list"]))
      .catch((error) => console.log(error));
  }, [id]);

  if (!contact) return <div>Loading...</div>;

  return (
    <ChakraProvider resetCSS>
      <Box
        backgroundColor="#FFF"
        borderRadius={20}
        p={4}
        border="3px solid #000"
        m={4}
      >
        <Button
          variant="solid"
          size="xs"
          leftIcon={<ArrowBackIcon />}
          display="flex"
          alignItems="center"
          flexDirection="row"
          className="but"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
        <Stack
          spacing={6}
          isInline
          justifyContent="space-between"
          alignItems="center"
          m={3}
        >
          <Box border="3px solid #000" borderRadius={100}>
            <Avatar
              size="2xl"
              showBorder
              src={contact.img}
              border="5px solid #ffe990"
              maxWidth={150}
              maxHeight={150}
              overflow="hidden"
              minWidth={150}
              minHeight={150}
              className="avatar"
            />
          </Box>
          <Box width="80%">
            <Heading textAlign="left" as="h1" size="xl">
              {contact.first_name} {contact.last_name}
            </Heading>
            <Text fontStyle="italic">{contact.pronouns}</Text>
            <Stack spacing={2} isInline alignItems="center" position="absolute">
              <Box className="tag friends">Friends</Box>
              <Box className="tag work">Work</Box>
              <Box className="tag personal">Personal</Box>
            </Stack>
          </Box>

          <Button
            variant="solid"
            size="md"
            rightIcon={<EditIcon />}
            backgroundColor="#C3C29C"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="row"
            className="but"
            onClick={() => {
              console.log(contact._id);
              navigate(`../edit/${contact._id}`);
            }}
          >
            Edit
          </Button>
        </Stack>
        <Box
          height={2}
          borderRadius={20}
          display="block"
          flexDirection="row"
          className="border"
        />
        <Stack
          spacing={2}
          alignItems="stretch"
          justifyContent="flex-start"
          isInline
          display="flex"
          flexDirection="row"
        >
          <Box width="60%" p={5} overflow="auto" height={260} m={1}>
            <Stack spacing={2}>
              <Box
                backgroundColor="#E4DFAF"
                borderRadius={20}
                overflow="hidden"
                textAlign="left"
                lineHeight={0}
                p={4}
              >
                <Stack
                  spacing={2}
                  flexDirection="row"
                  isInline
                  justifyContent="flex-start"
                  alignItems="stretch"
                >
                  <PhoneIcon />
                  <Text width="60%" fontWeight="bold" p={2}>
                    Phone Number
                  </Text>
                  <Text width="60%" textAlign="center" p={2}>
                    {contact.phone_number}
                  </Text>
                </Stack>
              </Box>
              <Box
                backgroundColor="#E4DFAF"
                borderRadius={20}
                overflow="hidden"
                textAlign="left"
                lineHeight={0}
                p={4}
              >
                <Stack
                  spacing={2}
                  flexDirection="row"
                  isInline
                  justifyContent="flex-start"
                  alignItems="stretch"
                >
                  <EmailIcon />
                  <Text width="35%" fontWeight="bold" p={2}>
                    Email
                  </Text>
                  <Text width="60%" textAlign="center" p={2}>
                    {contact.email}
                  </Text>
                </Stack>
              </Box>
              <Box
                backgroundColor="#E4DFAF"
                borderRadius={20}
                overflow="hidden"
                textAlign="left"
                lineHeight={0}
                p={4}
              >
                <Stack
                  spacing={2}
                  flexDirection="row"
                  isInline
                  justifyContent="flex-start"
                  alignItems="stretch"
                >
                  <CalendarIcon />
                  <Text width="35%" fontWeight="bold" p={2}>
                    Birthday
                  </Text>
                  <Text width="60%" textAlign="center" p={2}>
                    {contact.birthday}
                  </Text>
                </Stack>
              </Box>
              <Box
                backgroundColor="#E4DFAF"
                borderRadius={20}
                overflow="hidden"
                textAlign="left"
                lineHeight={0}
                p={4}
              >
                <Stack
                  spacing={2}
                  flexDirection="row"
                  isInline
                  justifyContent="flex-start"
                  alignItems="stretch"
                >
                  <AtSignIcon />
                  <Text width="35%" fontWeight="bold" p={2}>
                    Address
                  </Text>
                  <Text width="60%" textAlign="center" p={2}>
                    {contact.addess}
                  </Text>
                </Stack>
              </Box>
            </Stack>
          </Box>
          <Box width="40%" p={3}>
            <AvatarGroup
              spacing={1}
              max={25}
              size="xs"
              flexDirection="column"
              alignItems="stretch"
              display="block"
              height={250}
              overflow="auto"
              pl={0}
              pr={0}
              width="100%"
            >
              <Avatar size="md" src="link" mb={2} width={20} height={20} />
              <Avatar size="md" src="link" mb={2} width={20} height={20} />
              <Avatar size="md" src="link" mb={2} width={20} height={20} />
              <Avatar size="md" src="link" mb={2} width={20} height={20} />
              <Avatar size="md" src="link" mb={2} width={20} height={20} />
              <Avatar size="md" src="link" mb={2} width={20} height={20} />
              <Avatar size="md" src="link" mb={2} width={20} height={20} />
              <Avatar size="md" src="link" mb={2} width={20} height={20} />
              <Avatar size="md" src="link" mb={2} width={20} height={20} />
            </AvatarGroup>
          </Box>
        </Stack>
        <Box
          backgroundColor="#E4DFAF"
          borderRadius={20}
          overflow="hidden"
          textAlign="left"
          lineHeight={0}
          p={3}
          pb={6}
          m={2}
        >
          <Heading textAlign="left" as="h6" size="md">
            Notes
          </Heading>
          <Box p={2} height="100px" overflow="auto">
            <Text textAlign="left" lineHeight={1.5}>
              {contact.notes}
            </Text>
          </Box>
        </Box>
        <Stack spacing={2} isInline p={2}>
          <Button
            variant="solid"
            size="md"
            rightIcon={<StarIcon />}
            backgroundColor="#C3C29C"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="row"
            borderRadius={40}
            width="50%"
            className="but"
            onClick={() => {
              const updatedContact = {
                ...contact,
                favorite: !contact.favorite,
              };
              updateContact(updatedContact).then((updated) => {
                if (updated) setContact(updated);
              });
            }}
          >
            {contact.favorite ? "Remove from Favorites" : "Add to Favorites"}
          </Button>
          <Button
            variant="solid"
            size="md"
            rightIcon={<ExternalLinkIcon />}
            backgroundColor="#C3C29C"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="row"
            borderRadius={40}
            width="50%"
            className="but"
          >
            Share Contact
          </Button>
        </Stack>
      </Box>
    </ChakraProvider>
  );
}

export default Contact;

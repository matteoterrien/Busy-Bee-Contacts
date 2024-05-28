import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  ChakraProvider,
  Box,
  Stack,
  Text,
  Button,
  Heading,
  Avatar,
  Icon,
  Textarea,
  IconButton,
  AvatarGroup,
} from "@chakra-ui/react";
import {
  CheckIcon,
  DeleteIcon,
  PhoneIcon,
  EmailIcon,
  CalendarIcon,
  AtSignIcon,
  CloseIcon,
  AddIcon,
} from "@chakra-ui/icons";

function Edit() {
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
        <Box>
          <Stack
            spacing={2}
            isInline
            alignItems="center"
            justifyContent="space-between"
          >
            <Button
              variant="solid"
              size="md"
              leftIcon={<CloseIcon />}
              colorScheme="gray"
              backgroundColor="red.500"
              className="butred"
              display="flex"
              alignItems="center"
              flexDirection="row"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button
              variant="solid"
              size="md"
              rightIcon={<CheckIcon />}
              colorScheme="gray"
              backgroundColor="green.500"
              display="flex"
              alignItems="center"
              flexDirection="row"
              className="butgreen"
              onClick={() => {
                updateContact(contact);
                navigate(-1);
              }}
            >
              Done
            </Button>
          </Stack>
        </Box>
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
              border="5px solid #6969"
              maxWidth={150}
              maxHeight={150}
              overflow="hidden"
              minWidth={150}
              minHeight={150}
            />
          </Box>
          <Box width="80%">
            <Textarea
              placeholder={
                contact.first_name || contact.last_name
                  ? contact.first_name + " " + contact.last_name
                  : "Name"
              }
              size="lg"
              fontSize="4xl"
              m={3}
            />
            <Text fontStyle="italic">Pronouns</Text>
            <Stack spacing={2} isInline alignItems="center">
              <Box className="tag friends">Friends</Box>
              <Box className="tag work">Work</Box>
              <Box className="tag personal">Personal</Box>
              <button className="tag buttag all">Add Tag</button>
            </Stack>
          </Box>
        </Stack>
        <Box
          height={2}
          backgroundColor="#C3C29C"
          borderRadius={20}
          display="block"
          flexDirection="row"
        >
          <AvatarGroup spacing={-3} max={3} size="md" />
        </Box>
        <Stack
          spacing={2}
          alignItems="stretch"
          justifyContent="flex-start"
          isInline
          display="flex"
          flexDirection="row"
        >
          <Box width="50%" p={3} overflow="scroll" height={260}>
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
                  alignItems="center"
                >
                  <PhoneIcon />
                  <Text width="65%" fontWeight="bold" p={2}>
                    Phone Number
                  </Text>
                  <Textarea
                    placeholder={
                      contact.phone_number ? contact.phone_number : "XXX-XXXX"
                    }
                    resize="none"
                    minH={1}
                  />
                </Stack>
                <Stack spacing={2} justifyContent="flex-end" mt={2} height={7}>
                  <IconButton
                    aria-label="icon"
                    icon={<DeleteIcon />}
                    size="md"
                    backgroundColor="#eb5555"
                    className="butred"
                  />
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
                  alignItems="center"
                >
                  <EmailIcon />
                  <Text width="65%" fontWeight="bold" p={2}>
                    Email
                  </Text>
                  <Textarea
                    placeholder={contact.email ? contact.email : "XXX-XXXX"}
                    resize="none"
                    minH={1}
                  />
                </Stack>
                <Stack spacing={2} justifyContent="flex-end" mt={2} height={7}>
                  <IconButton
                    aria-label="icon"
                    icon={<DeleteIcon />}
                    size="md"
                    backgroundColor="red.500"
                    className="butred"
                  />
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
                  alignItems="center"
                >
                  <CalendarIcon />
                  <Text width="65%" fontWeight="bold" p={2}>
                    Birthday
                  </Text>
                  <Textarea
                    placeholder={
                      contact.birthday ? contact.birthday : "XX/XX/XXXX"
                    }
                    resize="none"
                    minH={1}
                  />
                </Stack>
                <Stack spacing={2} justifyContent="flex-end" mt={2} height={7}>
                  <IconButton
                    aria-label="icon"
                    icon={<DeleteIcon />}
                    size="md"
                    backgroundColor="red.500"
                    className="butred"
                  />
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
                  justifyContent="flex-start"
                  alignItems="stretch"
                >
                  <AtSignIcon />
                  <Text width="65%" fontWeight="bold" p={2}>
                    Address
                  </Text>
                  <Textarea
                    placeholder={contact.addess ? contact.address : "XXX-XXXX"}
                    resize="none"
                    minH={1}
                  />
                </Stack>
                <Stack spacing={2} justifyContent="flex-end" mt={2} height={7}>
                  <IconButton
                    aria-label="icon"
                    icon={<DeleteIcon />}
                    size="md"
                    backgroundColor="red.500"
                    className="butred"
                  />
                </Stack>
              </Box>
            </Stack>
          </Box>
          <Box
            width="50%"
            p={3}
            height={260}
            overflow="hidden"
            display="inline"
          >
            <Stack spacing={2}>
              <Button
                variant="solid"
                size="lg"
                rightIcon={<AddIcon />}
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="row"
                borderRadius={40}
                className="but"
              >
                Add Info Pill
              </Button>
              <Button
                variant="solid"
                size="lg"
                rightIcon={<AddIcon />}
                backgroundColor="#C3C29C"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="row"
                borderRadius={40}
                className="but"
              >
                Add Social
              </Button>
            </Stack>
            <Box />
            <AvatarGroup
              spacing={3}
              max={25}
              size="xl"
              justifyContent="center"
              m={3}
              height={130}
              overflow="scroll"
              alignItems="stretch"
              flexDirection="row"
              display="block"
              opacity={1}
              backgroundColor="whiteAlpha.300"
            >
              <Avatar size="lg" src="link" m={2} />
              <Avatar size="lg" src="link" m={2} />
              <Avatar size="lg" src="link" m={2} />
              <Avatar size="lg" src="link" m={2} />
              <Avatar size="lg" src="link" m={2} />
              <Avatar size="lg" src="link" m={2} />
              <Avatar size="lg" src="link" m={2} />
              <Avatar size="lg" src="link" m={2} />
              <Avatar size="lg" src="link" m={2} />
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
          <Box p={2} height="100px" overflow="scroll">
            <Textarea placeholder="Edit Note..." />
          </Box>
        </Box>
        <Button
          className="butred"
          variant="solid"
          size="md"
          rightIcon={<DeleteIcon />}
          backgroundColor="red.300"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="row"
          borderRadius={40}
          width="100%"
          color="#000000"
        >
          Delete Contact
        </Button>
      </Box>
    </ChakraProvider>
  );
}

export default Edit;

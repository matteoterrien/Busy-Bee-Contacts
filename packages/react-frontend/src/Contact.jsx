import { useParams, useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import {
    ChakraProvider,
    Box,
    Stack,
    HStack,
  Heading,
    Text,
    Button,
    AvatarGroup,
    Avatar,
    Icon,
} from '@chakra-ui/react'
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
import {
  getCommonBoxProps,
  getCommonButtonProps,
  getCommonAvatarProps,
  getCommonStackProps,
  getCommonInnerBoxProps,
} from "./utils/ContactUtils"; // Import utility functions

function Contact({ handleSubmit }) {
    const { id } = useParams()
    const navigate = useNavigate()
    const [contact, setContact] = useState(null)

    function updateContact(contact) {
        const id = contact._id
        const promise = fetch('http://localhost:8000/contacts', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(id, contact),
            code: 201,
        })
            .then((res) => {
                if (res.status == 201) {
                    return res.json()
                } else {
                    console.log('ERROR: Returned Status ', res.status)
                }
            })
            .catch((error) => {
                console.log(error)
            })
        return promise
    }

    useEffect(() => {
        fetch(`http://localhost:8000/contacts/${id}`)
            .then((res) => res.json())
            .then((data) => setContact(data['contact_list']))
            .catch((error) => console.log(error))
    }, [id])

    if (!contact) return <div>Loading...</div>

  return (
    <ChakraProvider resetCSS>
      <Box {...getCommonBoxProps()}>
        <Button
          {...getCommonButtonProps({
            size: "xs",
            leftIcon: <ArrowBackIcon />,
            className: "but",
            onClick: () => navigate(-1),
          })}
        >
          Back
        </Button>
        <Stack {...getCommonStackProps()}>
          <Box border="3px solid #000" borderRadius={100}>
            <Avatar {...getCommonAvatarProps({ src: contact.img })} />
          </Box>
          <Box width="80%">
            <Heading textAlign="left" as="h1" size="xl">
              {contact.first_name} {contact.last_name}
            </Heading>
            <Text fontStyle="italic">{contact.pronouns}</Text>
            <HStack spacing={2}>
              <Box className="tag friends" pt={1}>Friends</Box>
              <Box className="tag work" pt={1}>Work</Box>
              <Box className="tag personal" pt={1}>Personal</Box>
            </HStack>
          </Box>

          <Button
            {...getCommonButtonProps({
              size: "md",
              rightIcon: <EditIcon />,
              backgroundColor: "#C3C29C",
              className: "but",
              onClick: () => {
                console.log(contact._id);
                navigate(`../edit/${contact._id}`);
              },
            })}
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
              <Box {...getCommonInnerBoxProps()}>
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
              <Box {...getCommonInnerBoxProps()}>
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
              <Box {...getCommonInnerBoxProps()}>
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
              <Box {...getCommonInnerBoxProps()}>
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
          {...getCommonInnerBoxProps({ backgroundColor: "#E4DFAF", pb: 6, m: 2 })}
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
            {...getCommonButtonProps({
              size: "md",
              rightIcon: <StarIcon />,
              backgroundColor: "#C3C29C",
              className: "but",
              onClick: () => {
                const updatedContact = {
                  ...contact,
                  favorite: !contact.favorite,
                };
                updateContact(updatedContact).then((updated) => {
                  if (updated) setContact(updated);
                });
              },
              width: "50%",
            })}
          >
            {contact.favorite ? "Remove from Favorites" : "Add to Favorites"}
          </Button>
          <Button
            {...getCommonButtonProps({
              size: "md",
              rightIcon: <ExternalLinkIcon />,
              backgroundColor: "#C3C29C",
              className: "but",
              width: "50%",
            })}
          >
            Share Contact
          </Button>
        </Stack>
      </Box>
    </ChakraProvider>
  );
}

export default Contact;
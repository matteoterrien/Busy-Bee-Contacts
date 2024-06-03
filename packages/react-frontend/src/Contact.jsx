// src/Contact.jsx
import React from 'react';
import {
  Box,
  Stack,
  Button,
  Avatar,
  Heading,
  Text,
  HStack,
  AvatarGroup,
  ChakraProvider,
} from '@chakra-ui/react';
import {
  ArrowBackIcon,
  EditIcon,
  PhoneIcon,
  EmailIcon,
  CalendarIcon,
  AtSignIcon,
  StarIcon,
  ExternalLinkIcon,
} from '@chakra-ui/icons';
import { getCommonProps, getCommonStackProps, getCommonButtonProps, commonAvatarProps, commonBoxProps } from './utils';

const Contact = ({ contact, navigate, updateContact, setContact }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Selected file:', file);
      // Here you can handle the file upload logic
    }
  };

  return (
    <ChakraProvider resetCSS>
      <Box backgroundColor="#FFF" borderRadius={20} p={4} border="3px solid #000" m={4}>
        <Button
          {...getCommonButtonProps({
            size: "xs",
            leftIcon: <ArrowBackIcon />,
            onClick: () => navigate(-1),
          })}
        >
          Back
        </Button>
        <Stack {...getCommonStackProps({ spacing: 6, m: 3 })}>
          <Box border="3px solid #000" borderRadius={100}>
            <label htmlFor="file-input">
              <Avatar {...commonAvatarProps} src={contact.img} />
            </label>
            <input
              id="file-input"
              type="file"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
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
              justifyContent: "center",
              onClick: () => {
                console.log(contact._id);
                navigate(`../edit/${contact._id}`);
              },
            })}
          >
            Edit
          </Button>
        </Stack>
        <Box height={2} borderRadius={20} display="block" flexDirection="row" className="border" />
        <Stack {...getCommonStackProps({ spacing: 2, m: 1 })}>
          <Box width="60%" p={5} overflow="auto" height={260}>
            <Stack spacing={2}>
              <Box {...commonBoxProps}>
                <Stack {...getCommonStackProps({ flexDirection: "row", justifyContent: "flex-start" })}>
                  <PhoneIcon />
                  <Text width="60%" fontWeight="bold" p={2}>
                    Phone Number
                  </Text>
                  <Text width="60%" textAlign="center" p={2}>
                    {contact.phone_number}
                  </Text>
                </Stack>
              </Box>
              <Box {...commonBoxProps}>
                <Stack {...getCommonStackProps({ flexDirection: "row", justifyContent: "flex-start" })}>
                  <EmailIcon />
                  <Text width="35%" fontWeight="bold" p={2}>
                    Email
                  </Text>
                  <Text width="60%" textAlign="center" p={2}>
                    {contact.email}
                  </Text>
                </Stack>
              </Box>
              <Box {...commonBoxProps}>
                <Stack {...getCommonStackProps({ flexDirection: "row", justifyContent: "flex-start" })}>
                  <CalendarIcon />
                  <Text width="35%" fontWeight="bold" p={2}>
                    Birthday
                  </Text>
                  <Text width="60%" textAlign="center" p={2}>
                    {contact.birthday}
                  </Text>
                </Stack>
              </Box>
              <Box {...commonBoxProps}>
                <Stack {...getCommonStackProps({ flexDirection: "row", justifyContent: "flex-start" })}>
                  <AtSignIcon />
                  <Text width="35%" fontWeight="bold" p={2}>
                    Address
                  </Text>
                  <Text width="60%" textAlign="center" p={2}>
                    {contact.address}
                  </Text>
                </Stack>
              </Box>
            </Stack>
          </Box>
          <Box width="40%" p={3}>
            <AvatarGroup spacing={1} max={25} size="xs" flexDirection="column" alignItems="stretch" display="block" height={250} overflow="auto" pl={0} pr={0} width="100%">
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
        <Box backgroundColor="#E4DFAF" borderRadius={20} overflow="hidden" textAlign="left" lineHeight={0} p={3} pb={6} m={2}>
          <Heading textAlign="left" as="h6" size="md">
            Notes
          </Heading>
          <Box p={2} height="100px" overflow="auto">
            <Text textAlign="left" lineHeight={1.5}>
              {contact.notes}
            </Text>
          </Box>
        </Box>
        <Stack {...getCommonStackProps({ spacing: 2, p: 2, isInline: true })}>
          <Button
            {...getCommonButtonProps({
              size: "md",
              rightIcon: <StarIcon />,
              backgroundColor: "#C3C29C",
              justifyContent: "center",
              borderRadius: 40,
              width: "50%",
              onClick: () => {
                const updatedContact = {
                  ...contact,
                  favorite: !contact.favorite,
                };
                updateContact(updatedContact).then((updated) => {
                  if (updated) setContact(updated);
                });
              },
            })}
          >
            {contact.favorite ? "Remove from Favorites" : "Add to Favorites"}
          </Button>
          <Button
            {...getCommonButtonProps({
              size: "md",
              rightIcon: <ExternalLinkIcon />,
              backgroundColor: "#C3C29C",
              justifyContent: "center",
              borderRadius: 40,
              width: "50%",
            })}
          >
            Share Contact
          </Button>
        </Stack>
      </Box>
    </ChakraProvider>
  );
};

export default Contact;

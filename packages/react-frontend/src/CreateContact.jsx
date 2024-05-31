// src/CreateContact.jsx
import { useParams, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {
  ChakraProvider,
  Box,
  Stack,
  Text,
  Button,
  Heading,
  Avatar,
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
import {
  getCommonProps,
  getCommonStackProps,
  getCommonButtonProps,
  commonAvatarProps,
  commonBoxProps,
} from './utils';

function CreateContact() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState("");

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
          <Stack {...getCommonStackProps()}>
            <Button
              {...getCommonButtonProps({
                size: "md",
                leftIcon: <CloseIcon />,
                colorScheme: "gray",
                backgroundColor: "red.500",
                onClick: () => navigate("/"),
              })}
            >
              Cancel
            </Button>
            <Button
              {...getCommonButtonProps({
                size: "md",
                rightIcon: <CheckIcon />,
                colorScheme: "gray",
                backgroundColor: "green.500",
                onClick: () => navigate("/"),
              })}
            >
              Done
            </Button>
          </Stack>
        </Box>
        <Stack {...getCommonStackProps({ spacing: 6, m: 3 })}>
          <Box border="3px solid #000" borderRadius={100}>
            <Avatar {...commonAvatarProps} src={contact.img} />
          </Box>
          <Box width="80%">
            <Textarea
              placeholder={
                contact.first_name || contact.last_name
                  ? `${contact.first_name} ${contact.last_name}`
                  : "Name"
              }
              size="lg"
              fontSize="4xl"
              m={3}
            />
            <Text fontStyle="italic">Pronouns</Text>
            <Stack {...getCommonStackProps()}>
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
        />
        <Stack {...getCommonStackProps({ isInline: false })}>
          <Box width="50%" p={3} overflow="scroll" height={260}>
            <Stack spacing={2}>
              {[
                { icon: <PhoneIcon />, placeholder: "Phone Number", value: contact.phone_number },
                { icon: <EmailIcon />, placeholder: "Email", value: contact.email },
                { icon: <CalendarIcon />, placeholder: "Birthday", value: contact.birthday },
                { icon: <AtSignIcon />, placeholder: "Address", value: contact.address },
              ].map(({ icon, placeholder, value }, index) => (
                <Box key={index} {...commonBoxProps}>
                  <Stack {...getCommonStackProps({ flexDirection: "row", isInline: true })}>
                    {icon}
                    <Text width="65%" fontWeight="bold" p={2}>
                      {placeholder}
                    </Text>
                    <Textarea
                      placeholder={value ? value : `XXX-XXXX`}
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
              ))}
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
                {...getCommonButtonProps({
                  size: "lg",
                  rightIcon: <AddIcon />,
                  borderRadius: 40,
                  className: "but",
                })}
              >
                Add Info Pill
              </Button>
              <Button
                {...getCommonButtonProps({
                  size: "lg",
                  rightIcon: <AddIcon />,
                  backgroundColor: "#C3C29C",
                  borderRadius: 40,
                  className: "but",
                })}
              >
                Add Social
              </Button>
            </Stack>
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
              {Array(9).fill().map((_, index) => (
                <Avatar key={index} size="lg" src="link" m={2} />
              ))}
            </AvatarGroup>
          </Box>
        </Stack>
        <Box {...commonBoxProps} p={3} pb={6} m={2}>
          <Heading textAlign="left" as="h6" size="md">
            Notes
          </Heading>
          <Box p={2} height="100px" overflow="scroll">
            <Textarea placeholder="Edit Note..." />
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default CreateContact;

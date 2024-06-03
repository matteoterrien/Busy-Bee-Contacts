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
import { getCommonBoxProps, getCommonHStackProps, getCommonButtonProps, getCommonAvatarProps, getCommonStackProps, getCommonInnerBoxProps, getIconButtonProps, getAvatarGroupProps } from "./utils/CreateContactUtils";

function CreateContact() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState("");

  
  return (
    <ChakraProvider resetCSS>
      <Box {...getCommonBoxProps()}>
        <Box>
          <Stack {...getCommonHStackProps({ isInline: true })}>
            <Button
              {...getCommonButtonProps({
                leftIcon: <CloseIcon />,
                colorScheme: "gray",
                backgroundColor: "red.500",
                className: "butred",
                onClick: () => navigate("/"),
              })}
            >
              Cancel
            </Button>
            <Button
              {...getCommonButtonProps({
                rightIcon: <CheckIcon />,
                colorScheme: "gray",
                backgroundColor: "green.500",
                className: "butgreen",
                onClick: () => {
                  navigate("/");
                },
              })}
            >
              Done
            </Button>
          </Stack>
        </Box>
        <Stack {...getCommonStackProps()}>
          <Box border="3px solid #000" borderRadius={100}>
            <Avatar {...getCommonAvatarProps({ src: contact.img })} />
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
            <Stack spacing={2} isInline alignItems="center">
              <Box className="tag friends" pt={1}>Friends</Box>
              <Box className="tag work" pt={1}>Work</Box>
              <Box className="tag personal" pt={1}>Personal</Box>
              <button className="tagbut tag all">Add Tag</button>
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
              <Box {...getCommonInnerBoxProps()}>
                <Stack spacing={2} flexDirection="row" isInline justifyContent="flex-start" alignItems="center">
                  <PhoneIcon />
                  <Text width="65%" fontWeight="bold" p={2}>Phone Number</Text>
                  <Textarea placeholder={contact.phone_number ? contact.phone_number : "XXX-XXXX"} resize="none" minH={1} />
                </Stack>
                <Stack spacing={2} justifyContent="flex-end" mt={2} height={7}>
                  <IconButton {...getIconButtonProps()} />
                </Stack>
              </Box>
              <Box {...getCommonInnerBoxProps()}>
                <Stack spacing={2} flexDirection="row" isInline justifyContent="flex-start" alignItems="center">
                  <EmailIcon />
                  <Text width="65%" fontWeight="bold" p={2}>Email</Text>
                  <Textarea placeholder={contact.email ? contact.email : "XXX-XXXX"} resize="none" minH={1} />
                </Stack>
                <Stack spacing={2} justifyContent="flex-end" mt={2} height={7}>
                  <IconButton {...getIconButtonProps()} />
                </Stack>
              </Box>
              <Box {...getCommonInnerBoxProps()}>
                <Stack spacing={2} flexDirection="row" isInline justifyContent="flex-start" alignItems="center">
                  <CalendarIcon />
                  <Text width="65%" fontWeight="bold" p={2}>Birthday</Text>
                  <Textarea placeholder={contact.birthday ? contact.birthday : "XX/XX/XXXX"} resize="none" minH={1} />
                </Stack>
                <Stack spacing={2} justifyContent="flex-end" mt={2} height={7}>
                  <IconButton {...getIconButtonProps()} />
                </Stack>
              </Box>
              <Box {...getCommonInnerBoxProps()}>
                <Stack spacing={2} flexDirection="row" justifyContent="flex-start" alignItems="stretch">
                  <AtSignIcon />
                  <Text width="65%" fontWeight="bold" p={2}>Address</Text>
                  <Textarea placeholder={contact.address ? contact.address : "XXX-XXXX"} resize="none" minH={1} />
                </Stack>
                <Stack spacing={2} justifyContent="flex-end" mt={2} height={7}>
                  <IconButton {...getIconButtonProps()} />
                </Stack>
              </Box>
            </Stack>
          </Box>
          <Box width="50%" p={3} height={260} overflow="hidden" display="inline">
            <Stack spacing={2}>
              <Button {...getCommonButtonProps({ size: "lg", rightIcon: <AddIcon />, borderRadius: 40, className: "but" })}>
                Add Info Pill
              </Button>
              <Button {...getCommonButtonProps({ size: "lg", rightIcon: <AddIcon />, backgroundColor: "#C3C29C", borderRadius: 40, className: "but" })}>
                Add Social
              </Button>
            </Stack>
            <Box />
            <AvatarGroup {...getAvatarGroupProps()}>
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
        <Box {...getCommonInnerBoxProps({ pb: 6, m: 2 })}>
          <Heading textAlign="left" as="h6" size="md">Notes</Heading>
          <Box p={2} height="100px" overflow="scroll">
            <Textarea placeholder="Edit Note..." />
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default CreateContact;
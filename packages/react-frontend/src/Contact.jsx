import React from "react";
import styles from "./styles.css";
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

const App = () => (
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
            src="https://i.pinimg.com/736x/61/a5/0c/61a50c0da17651125c5dd1620b0b1483.jpg"
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
            Name
          </Heading>
          <Text fontStyle="italic">Pronouns</Text>
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
                  XXX-XXXX
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
                  XXX@XXXX.XXX
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
                  XXXX XX, XXXX
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
                  XXXX XXXXX XX XX
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
            Text value Text value Text value Text valueText value Text value
            Text valueText value Text value Text valueText value Text value Text
            valueText value Text value Text valueText value Text valueText value
            Text value Text valueText value Text value Text valueText value Text
            value Text value Text value Text value Text value Text valueText
            value Text value Text valueText value Text value Text valueText
            value Text value Text valueText value Text value Text valueText
            value Text valueText value Text value Text valueText value Text
            value Text valueText value Text value Text value Text value Text
            value Text value Text valueText value Text value Text valueText
            value Text value Text valueText value Text value Text valueText
            value Text value Text valueText value Text valueText value Text
            value Text valueText value Text value Text valueText value Text
            value Text value
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
        >
          Add to Favorites
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

export default App;

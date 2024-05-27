import styles from "./main.css";
import {
  Text,
  Box,
  Button,
  Image,
  Stack,
  Flex,
  HStack,
  VStack,
  ChakraProvider,
  Spacer,
} from "@chakra-ui/react";
import { AddIcon, StarIcon } from "@chakra-ui/icons"; //import BeeIcon from "./assets/BeeIcon";

function HomeHeader() {
  return (
    <ChakraProvider resetCSS>
      <Stack isInline position="sticky" alignItems="center">
        <Image
          src="https://us.123rf.com/450wm/kaissaart/kaissaart1807/kaissaart180700038/114801772-bee-flat-design-illustration-simple-vector-icon.jpg?ver=6"
          minH={140}
          maxW={140}
          align="marginLeft"
        />
        <Stack width="100%">
          <Text
            marginLeft="5%"
            fontSize="xxx-large"
            fontFamily="Kokoro"
            fontWeight="bold"
            position="relative"
          >
            Busy Bee Contacts
          </Text>
          <Stack marginLeft="5%" spacing={2} isInline alignItems="center">
            <button className="tagbut tag all">All</button>
            <button className="friends tag tagbut">Friends</button>
            <button className="tagbut tag family">Family</button>
            <button className="tagbut tag work">Work</button>
            <button className="tagbut tag school">School</button>
            <button className="tagbut tag personal">Personal</button>
            <button className="tagbut tag medical">Medical</button>
          </Stack>
        </Stack>
      </Stack>
    </ChakraProvider>
  );
}

function FavoritesHeader() {
  return (
    <Box
      borderRadius="lg"
      alignItems="center"
      bg="#E4DFAF"
      minH={45}
      display="flex"
      width="100%"
    >
      <Stack isInline alignItems="center" padding={10}>
        <Text ml={5} fontSize={25} fontFamily="kokoro" as="b">
          Favorites
        </Text>
        <StarIcon display="flex" boxSize={25} />
      </Stack>
    </Box>
  );
}

function ShowAllContacts() {
  return (
    <Box
      borderRadius="lg"
      alignItems="center"
      bg="#E4DFAF"
      minH={45}
      display="flex"
      width="100%"
    >
      <HStack alignItems="center" minH={45} minW="100%" padding={10}>
        <Text ml={5} fontSize={25} fontFamily="kokoro" as="b">
          All
        </Text>
        <Spacer />
        <Button
          variant="solid"
          size="md"
          rightIcon={<AddIcon />}
          display="flex"
          padding="sm"
          alignItems="center"
          justifyContent="center"
          flexDirection="row"
          maxH={35}
          backgroundColor="white"
          className="add but"
        >
          Add Contact
        </Button>
      </HStack>
    </Box>
  );
}

function HomeBody(props) {
  const rows = props.contactData.map((row, index) => {
    return (
      <div key={index}>
        <Button
          display="flex"
          width="100%"
          borderRadius="lg"
          bg="lightgray"
          justifyContent="flex-start"
          alignItems="flex-start"
          mt={3}
          overflow="hidden"
          height="auto"
          onClick={() => props.selectContact(row._id)}
        >
          <Box
            width="50%"
            display="flex"
            justifyContent="center"
            alignItems="flex-start"
            flexDirection="column"
          >
            <Box fontSize="xl" mb={1}>
              {row.first_name} {row.last_name}
            </Box>
            <Box>
              {row.phone_number} &bull; {row.email}
            </Box>
          </Box>
        </Button>
      </div>
    );
  });
  return <>{rows}</>;
} 

function HomePage(props) {
  return (
    <>
      <HomeHeader />
      <FavoritesHeader />
      <HomeBody
        contactData={props.contactData}
        selectContact={props.selectContact}
      />
      <ShowAllContacts />
    </>
  );
}


export default HomePage;

import React from "react";
import { Text, Box, Button, Stack, ButtonGroup } from "@chakra-ui/react";
import BeeIcon from "./assets/BeeIcon";

function HomeHeader() {
  return (
    <div>
      <Box display="flex">
        <BeeIcon />
        <Text marginLeft="5%" fontSize="6xl" fontFamily="Kokoro">
          Busy Bee Contacts
        </Text>
      </Box>
    </div>
  );
}

function FavoritesHeader() {
  return (
    <Box borderRadius="lg" alignItems="center" bg="#E4DFAF">
      <Text ml={5} fontSize="4xl" fontFamily="kokoro" as="b">
        Favorites
      </Text>
    </Box>
  );
}

function ShowAllContacts() {
  return (
    <Box borderRadius="lg" alignItems="center" bg="#E4DFAF" mt={3}>
      <Text ml={5} fontSize="4xl" fontFamily="kokoro" as="b">
        All
      </Text>
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
      <ShowAllContacts />
      <HomeBody
        contactData={props.contactData}
        selectContact={props.selectContact}
      />
    </>
  );
}

export default HomePage;

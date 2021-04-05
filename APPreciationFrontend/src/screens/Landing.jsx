import React from "react";

import { Flex, Link, Heading, Box, Button } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

import axios from "axios";
import Fade from "react-reveal/Fade";

function Landing() {
  axios
    .get("https://aydanpirani77.pythonanywhere.com/")
    .then((results) => console.log("Server", results.statusText))
    .catch((err) => console.log(err));

  return (
    <Flex flexDirection="row" h="100vh">
      <Flex
        backgroundColor="teal.200"
        color="teal.900"
        flexDirection="column"
        flex="7"
        justifyContent="space-around"
      >
        <Fade>
          <Flex flexDirection="row" justifyContent="space-between" m="10">
            <Flex>
              <StarIcon w="10" h="10" />
              <Heading>APPreciate</Heading>
            </Flex>
            <Box>
              <Link href="/signup" m="5" p="5">
                Sign Up
              </Link>
              <Link href="/signin">Sign In</Link>
            </Box>
          </Flex>
          <Flex justifyContent="center" flexDirection="column">
            <Heading as="h1" size="4xl" marginLeft="25px" width="700px">
              1. Donate
            </Heading>
            <Heading as="h1" size="4xl" marginLeft="25px" width="700px">
              2. Leave a Note
            </Heading>
            <Heading as="h1" size="4xl" marginLeft="25px" width="700px">
              3. Be Kind
            </Heading>
          </Flex>
          <Flex flexDirection="row" m="10">
            <Link href="/signup" style={{ textDecoration: "none" }}>
              <Button colorScheme="teal" size="lg" m="5">
                Try It Out
              </Button>
            </Link>
            <Link href="/signin" style={{ textDecoration: "none" }}>
              <Button colorScheme="teal" size="lg" m="5">
                Existing User
              </Button>
            </Link>
          </Flex>
        </Fade>
      </Flex>
      <Flex flex="5" className="Landing-Background" />
    </Flex>
  );
}

export default Landing;

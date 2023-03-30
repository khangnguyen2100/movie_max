import React,{memo} from "react";
import { Link } from "react-router-dom";
import { Text, Box, Flex, HStack } from "@chakra-ui/react";
const Footer = () => {
  return (
    <Flex
      align="center"
      justify="space-between"
      fontSize={{
        base: "14px",
        md: "16px",
      }}
      layerStyle='containerStyles'
    >
      <Box
        width={{
          base: "50%",
          lg: "30%",
        }}
      >
        <Box
          fontWeight="extrabold"
          color="primaryColor"
          fontSize={{
            base: "14px",
            md: "16px",
          }}
        >
          <Link to="/">MovieMax</Link>
        </Box>
        <Text>
          Movie sources from ‎
          <Text
            as="a"
            href="https://loklok.com/"
            color="primaryColor"
            textDecoration="underline"
          >
            LokLok
          </Text>
        </Text>
      </Box>
      <HStack
        width="40%"
        spacing="40px"
        display={{ base: "none", lg: "flex" }}
        justifyContent="space-around"
        alignItems="center"
      >
        <Box color="textColor" _hover={{ color: "primaryColor" }}>
          <Link to="/">Home</Link>
        </Box>
        <Box color="textColor" _hover={{ color: "primaryColor" }}>
          <Link to="/filters">Find your movie</Link>
        </Box>
      </HStack>
      <Box
        width={{
          base: "50%",
          lg: "30%",
        }}
        textAlign="right"
      >
        <Text
          textAlign="right"
          fontSize={{
            base: "14px",
            md: "16px",
          }}
        >
          Contact
        </Text>
        <Box
          color="decsColor"
          fontSize={{
            base: "12px",
            md: "14px",
          }}
        >
          <Text>0933807909</Text>
          <Text>khangng2100@gmail.com</Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default memo(Footer);

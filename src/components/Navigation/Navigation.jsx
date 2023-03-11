import React, { memo } from "react";
import { Link } from "react-router-dom";
import { HStack, Box, Flex, Stack } from "@chakra-ui/react";

import NavInput from "./NavInput";
import MenuMobile from "./MenuMobile";

const Navigation = () => {
  return (
    <Box zIndex="100" position={"relative"}>
      <Box
        position="fixed"
        top="0"
        left="0"
        right="0"
        w="full"
        zIndex="100"
        boxShadow="rgba(0, 0, 0, 0.15) 0px 5px 15px"
        bg={'primaryDarkColor'}
      >
        <Box layerStyle={"containerStyles"}>
          <Flex
            h={"55px"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            {/* Logo  */}
            <Box fontWeight="extrabold" color="primaryColor" fontSize="lg">
              <Link to="/">MovieMax</Link>
            </Box>

            {/* Input  */}
            <NavInput />

            {/* Menu */}
            <Flex alignItems={"center"}>
              <Stack direction={"row"} spacing={7}>
                {/* Menu desktop */}
                <HStack spacing="30px" display={{ base: "none", lg: "flex" }}>
                  <Box color="textColor" _hover={{ color: "primaryColor" }}>
                    <Link to="/">Home</Link>
                  </Box>
                  <Box color="textColor" _hover={{ color: "primaryColor" }}>
                    <Link to="/filters">Find your movie</Link>
                  </Box>
                </HStack>

                {/* Menu mobile */}
                <MenuMobile />
              </Stack>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default memo(Navigation);

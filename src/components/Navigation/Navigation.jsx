import React, { memo } from "react";
import { Link } from "react-router-dom";

import {
  Box,
  Flex, HStack, Stack
} from "@chakra-ui/react";
import MenuMobile from "./MenuMobile";
import NavInput from "./NavInput";
import { navs } from "../Constans";

const Menu = () => {
  return (
    <Flex alignItems={"center"}>
      <Stack direction={"row"} spacing={7}>
        {/* Menu desktop */}
        <HStack spacing="30px" display={{ base: "none", lg: "flex" }}>
          {
            navs.map((nav, index) => (
              <Box key={index} role={'group'} transition={'all 0.3s ease'} pos={'relative'}>
                <Box color="textColor" fontWeight={'bold'} _hover={{ color: "primaryColor" }}>
                  <Link to={nav.href}>{nav.name}</Link>
                </Box>
                {
                  nav.subs && (
                    <>
                      <Box pos='absolute' top={'25px'} left='0' bg={'#384e7b'} pl='10px' pr='30px' h='0' rounded={'md'}  opacity={0}
                        _groupHover={{ h: '120px', opacity: '1', paddingY: '10px' }}
                        transition={'all 0.3s ease'}
                      >
                        {
                          nav.subs.map((sub, index) => (
                            <Box key={index} w='max-content' fontWeight={'semibold'} transition={'.1s all'} color="textColor" letterSpacing={'1.7'} _hover={{ color: "primaryColor" }}>
                              <Link to={sub.href}>{sub.name}</Link>
                            </Box>
                          ))
                        }
                      </Box>
                    </>
                  )
                }
              </Box>
            ))
          }
        </HStack>
        {/* Menu mobile */}
        <MenuMobile navs={navs} />
      </Stack>
    </Flex>
  )
}

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
            <Menu />
          </Flex>
        </Box>
      </Box>

    </Box>
  );
};

export default memo(Navigation);

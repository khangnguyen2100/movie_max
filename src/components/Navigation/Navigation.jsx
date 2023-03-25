import React, { memo } from "react";
import { Link } from "react-router-dom";

import {
  Box,
  Flex, HStack, Stack
} from "@chakra-ui/react";
import MenuMobile from "./MenuMobile";
import NavInput from "./NavInput";


const navs = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Movie",
    href: "/movie",
    subs: [
      { name: "Popular", href: "/movie/popular" },
      { name: "Top Rated", href: "/movie/top_rated" },
      { name: "Upcoming", href: "/movie/upcoming" },
      { name: "Now Playing", href: "/movie/now_playing" },
    ],
  },
  {
    name: "TV",
    href: "/tv",
    subs: [
      { name: "Popular", href: "/tv/popular" },
      { name: "Top Rated", href: "/tv/top_rated" },
      { name: "On The Air", href: "/tv/on_the_air" },
      { name: "Airing Today", href: "/tv/airing_today" },
    ],
  },
  {
    name: "People",
    href: "/people",
  },
  {
    name: "Find your movie",
    href: "/filters",
  },
]
const Menu = () => {
  return (
    <Flex alignItems={"center"}>
      <Stack direction={"row"} spacing={7}>
        {/* Menu desktop */}
        <HStack spacing="30px" display={{ base: "none", lg: "flex" }}>
          {
            navs.map((nav, index) => (
              <Box key={index} role={'group'} pos={'relative'}>
                <Box color="textColor" fontWeight={'bold'} _hover={{ color: "primaryColor" }}>
                  {
                    !nav.subs ? (
                      <Link to={nav.href}>{nav.name}</Link>
                    ) : (
                      <Flex align={'center'} columnGap={'1'}>
                        {nav.name}
                      </Flex>
                    )
                  }
                </Box>
                {
                  nav.subs && (
                    <>
                      <Box pos='absolute' top={'25px'} left='0' bg={'#384e7b'} p='10px' pr='30px' rounded={'md'} display={'none'} _groupHover={{ display: 'block' }}>
                        {
                          nav.subs.map((sub, index) => (
                            <Box key={index} w='max-content' color="textColor" letterSpacing={'1.7'} _hover={{ color: "primaryColor" }}>
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

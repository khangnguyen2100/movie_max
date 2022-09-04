import React from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Box,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const MenuMobile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        onClick={onOpen}
        rounded="full"
        variant="link"
        cursor="pointer"
        minW={0}
        color="textColor"
        _active={{
          color: "primaryColor",
        }}
        display={{ lg: "none" }}
      >
        <HamburgerIcon fontSize="2xl" />
      </Button>
      <Drawer placement={"right"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bg="transparent">
          <Box
            position={"absolute"}
            top="0" left={"0"} right="0" bottom={"0"}
            w="full" h="full"
            bg="rgba(21, 31, 50, .4)"
            backdropFilter="blur(20px) hue-rotate(90deg)"
          ></Box>
          <Box h='55px'>
            <Button
              onClick={onClose}
              variant="link"
              cursor="pointer"
              color="textColor"
              position={'absolute'} top='20px' right='20px'
            >
              <CloseIcon fontSize="24px" />
            </Button>
          </Box>
          <DrawerBody mt="100px" zIndex={"100"}>
            <Box
              textAlign={"right"}
              fontSize={"22px"}
              mb="25px"
              fontWeight="500"
              color="textColor"
              _hover={{ color: "primaryColor" }}
            >
              <Link 
                to="/"
                onClick={onClose}
              >Home</Link>
            </Box>
            <Box
              textAlign={"right"}
              fontSize={"22px"}
              mb="25px"
              fontWeight="500"
              color="textColor"
              _hover={{ color: "primaryColor" }}
            >
              <Link 
                to="/filters"
                onClick={onClose}
              >Find your movie</Link>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MenuMobile;

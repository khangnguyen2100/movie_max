import React, { memo, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Box,
  useDisclosure,
  Button,
  Flex,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { HamburgerIcon, CloseIcon, ChevronRightIcon } from "@chakra-ui/icons";

const MenuMobile = ({ navs }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeSubMenuIndex, setActiveSubMenuIndex] = useState(null)
  const handleClick = useCallback((index) => {
    setActiveSubMenuIndex(prev => prev === index ? null : index)
  }, [])
  const variants = {
    open: { opacity: 1, height: 'auto' },
    closed: { opacity: 0,  height: 0 },
  }
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
          <DrawerBody mt="75px" zIndex={"100"}>
            {
              navs.map((nav, index) => (
                <Box key={index} pos={'relative'}>
                  <Box textAlign={"left"}
                    fontSize={"22px"}
                    mt="25px"
                    fontWeight="500"
                    color="textColor"
                    _hover={{ color: "primaryColor" }}
                    >
                    {
                      !nav.subs ? (
                        <Link onClick={onClose} to={nav.href}>{nav.name}</Link>
                      ) : (
                        <Flex cursor={'pointer'} onClick={() => handleClick(index)} align={'center'} columnGap={'2'}>
                          {nav.name}
                          <motion.div
                            animate={activeSubMenuIndex === index ? { rotate: 90 } : { rotate: 0 }}
                            transition={{ duration: 0.25 }}
                          >
                            <ChevronRightIcon boxSize={6} fontWeight='medium' transition={'all .  2s'}/>
                          </motion.div>
                        </Flex>
                      )
                    }
                  </Box>
                  {
                    nav.subs && (
                      <motion.div
                        variants={variants}
                        initial="closed"
                        animate={activeSubMenuIndex === index ? "open" : "closed"}
                        transition={{ duration: 0.3 }}
                      >
                        <Box ml='3' mt='2' mb='5'>
                          {
                            nav.subs.map((sub, index) => (
                              <Box key={index} w='max-content' color="textColor" _notLast={{marginBottom: '7px'}} _hover={{ color: "primaryColor" }}>
                                <Link to={sub.href}>{sub.name}</Link>
                              </Box>
                            ))
                          }
                        </Box>
                      </motion.div>
                    )
                  }
                </Box>
              ))
            }
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default memo(MenuMobile);

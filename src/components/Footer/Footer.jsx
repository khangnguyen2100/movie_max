import { Box, Flex, HStack, Icon, Text } from "@chakra-ui/react";
import React, { memo } from "react";
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import { FiMail } from 'react-icons/fi';
import { Link } from "react-router-dom";

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
      {/* logo */}
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
            base: "18px",
            md: "20px",
          }}
        >
          <Link to="/">MovieMax</Link>
        </Box>
      </Box>
      {/* nav */}
      <HStack
        width="40%"
        spacing="40px"
        display={{ base: "none", lg: "flex" }}
        justifyContent="space-around"
        alignItems="center"
        fontWeight={'500'}
        fontSize={'18px'}
      >
        <Box color="textColor" _hover={{ color: "primaryColor" }}>
          <Link to="/">Home</Link>
        </Box>
        <Box color="textColor" _hover={{ color: "primaryColor" }}>
          <Link to="/movie">Movie</Link>
        </Box>
        <Box color="textColor" _hover={{ color: "primaryColor" }}>
          <Link to="/tv">Tv Shows</Link>
        </Box>
      </HStack>
      {/* contact */}
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
            base: "16px",
            md: "18px",
          }}
          mb='4'
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
          <Flex w={'full'} justify={'end'} align={'center'} columnGap={'5'}>
            <Link target="_blank" to={'https://www.linkedin.com/in/khangng2100/'}>
              <Icon boxSize={'6'} color={'rgba(50,138,241,.8)'} transition={'all .2s ease'} _hover={{ color: 'primaryColor' }} as={BsLinkedin} />
            </Link>
            <Link target="_blank" to={'https://github.com/khangnguyen2100/'}>
              <Icon boxSize={'6'} color={'rgba(50,138,241,.8)'} transition={'all .2s ease'} _hover={{ color: 'primaryColor' }} as={BsGithub} />
            </Link>
            <Link target="_blank" to={'mailto:khangng2100@gmail.com'}>
              <Icon boxSize={'6'} color={'rgba(50,138,241,.8)'} transition={'all .2s ease'} _hover={{ color: 'primaryColor' }} as={FiMail} />
            </Link>
          </Flex>
        </Box>
      </Box>
    </Flex >
  );
};

export default memo(Footer);

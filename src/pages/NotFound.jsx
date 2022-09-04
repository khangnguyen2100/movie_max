import React from 'react'
import { Box, Flex, Text, Heading } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
const NotFound = () => {
  return (
    <Flex direction={'column'} align='center' justify={'center'} mt='50px'>
      <Heading
        fontWeight={'bold'}
        fontSize='120px'
        lineHeight={'1'}
      >
        404
      </Heading>
      <Text
        fontSize={'36px'}
        fontWeight='600'
      >
        Page not found
      </Text>
      <Box
        fontSize={'20px'}
        fontWeight='500'
      >
        Please go back to our home page at&nbsp;
        <Text
          color='primaryColor'
          display={'inline-block'}
        >
          <Link
            to={'/'}
          >
            here!
          </Link>
        </Text>
      </Box>
    </Flex>
  )
}

export default NotFound
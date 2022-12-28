import React from 'react'
import { Box } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
const ButtonWhite = ({ content, href = "/" }) => {
  return (
    <Box boxShadow='md' rounded='sm' textTransform={'uppercase'} h='full' px='16' fontSize={'18px'} textAlign={'center'} maxW='300px' cursor='pointer' fontWeight='semibold' letterSpacing='3px' display='block' bgColor={'#fff'} rounded='0' color={'#333'}>
      <Link
        to={href}
        style={{
          display: "flex",
          alignItems : "center",
          height : '100%'
        }}
      >
        {content}
      </Link>
    </Box>
  )
}

export default ButtonWhite
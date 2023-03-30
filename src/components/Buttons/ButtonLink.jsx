import React from 'react'
import { Box } from '@chakra-ui/react'
const ButtonLink = ({content, color}) => {
  return (
    <Box textDecoration='underline' cursor='pointer' fontWeight='bold' letterSpacing='1.5px' display='block' color={color} _hover={{color : 'primaryColor'}}>
      {content}
    </Box>
  )
}

export default ButtonLink
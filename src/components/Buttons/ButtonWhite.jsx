import React from 'react'
import { Box } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
const ButtonWhite = ({ href = "/", children, customStyle }) => {
  return (
    <Box
      display='block' h='full' px='16'
      bgColor={'transparent'} color={'#FCE38A'} border={'1px solid #FCE38A'}
      textTransform={'uppercase'} fontSize={'18px'} textAlign={'center'} fontWeight='bold' letterSpacing='3px'
      rounded='sm' cursor='pointer'
      transition={'all 0.2s ease'}
      boxShadow='md'
      role="group"
      pos={'relative'}
      overflow={'hidden'}
      _hover={{
        color: '#333',
        transition: 'all 0.3s ease-in-out'
      }}
      {...customStyle}
    >
      <Box
        w={0} h={'100%'} pos={'absolute'} top={0} left={'-15px'}
        bgColor={'#FCE38A'}
        transition={'all 0.35s ease-out'}
        _groupHover={{ width: '110%' }}
        zIndex={-1}
        transform={'skewX(-20deg)'}
      />
      <Link
        to={href}
        style={{
          display: "flex",
          alignItems: "center",
          height: '100%'
        }}
      >
        {children}
      </Link>
    </Box>
  )
}

export default ButtonWhite
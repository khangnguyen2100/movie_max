import { Box } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
const ButtonWhite = ({ href = "/", children, customStyle }) => {
  return (
    <Box
      display='block' h='full' maxW={{base: '250px', md:'300px'}} w={'full'} px={4}
      bgColor={'transparent'} color={'#fff'} border={'1px solid rgba(50, 138, 241, 1)'}
      textTransform={'uppercase'} fontSize={'18px'} textAlign={'center'} fontWeight='bold' letterSpacing='3px'
      rounded='sm' cursor='pointer'
      transition={'all 0.2s ease'}
      boxShadow='md'
      role="group"
      bg={'rgba(50, 138, 241, .8)'}
      pos={'relative'}
      overflow={'hidden'}
      _hover={{
        color: '#fff',
        transition: 'all 0.3s ease-in-out'
      }}
      {...customStyle}
    >
      <Box
        w={0} h={'100%'} pos={'absolute'} top={0} left={'-15px'}
        bgColor={'rgba(50, 138, 241, 1)'}
        transition={'all 0.35s ease-out'}
        _groupHover={{ width: '110%' }}
        zIndex={-1}
        transform={'skewX(-30deg)'}
      />
      <Link
        to={href}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: '100%',
          width: '100%',
          textAlign: 'center',
        }}
      >
        {children}
      </Link>
    </Box>
  )
}

export default ButtonWhite
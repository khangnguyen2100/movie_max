import React from 'react'
import { Button } from '@chakra-ui/react'
const ButtonBg = ({children}) => {
  return (
    <Button 
      backgroundColor='backgroundBtnColor'
      bg='linear-gradient(120deg, rgba(50,138,241, .13) 0%, rgba(50,138,241, .13) 25%,transparent 25%)'
      p={{
        base : '10px 30px',
        md : '15px 40px'
      }} borderRadius={'10px'}
      display='flex' alignItems={'center'} justifyContent='center'
      backgroundPosition={'center center'}
      backgroundSize='450%'
      lineHeight={'0'}
      textAlign={'center'} textTransform='uppercase' color='#fff' fontWeight='bold'
      transition={'.4s'} 
      transitionTimingFunction='ease-out'
      _hover={{
        backgroundPosition: 'left center' ,
        color: 'primaryColor',
        textDecoration: 'none',
      }}
    >
      {children}   
    </Button>
  )
}

export default ButtonBg
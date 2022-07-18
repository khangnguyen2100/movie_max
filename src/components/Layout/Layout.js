import React from 'react'
import { Box } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'

import Navigation from '../Navigation/Navigation'
import Slider from '../Slider/Slider'
import Footer from '../Footer/Footer'
import ScrollToTopBtn from '../Buttons/ScrollToTopBtn'
const Layout = ({ children }) => {
  const path = useLocation()
  return (
    <Box  minHeight={'100vh'} position={'relative'} fontFamily="body" fontSize='16px' maxW='full' color='textColor' display={'flex'} flexDirection={'column'}
      backgroundColor={'bgColor'} 
      bg={'linear-gradient(170deg,hsl(219, 41%, 10%), hsl(219, 41%, 3%))'}
    >
      {/* navigation layout */}
      <Box zIndex='100' position={'relative'} h='55px' bg={'bgColor'}
      >
        <Box
          bg={'bgColor'} 
          position='fixed' top='0' left='0' right='0' w='full' zIndex='100'
          boxShadow='rgba(0, 0, 0, 0.15) 0px 5px 15px'
        > 
          <Box
            px={{
              base : '10px',
              md : '20px'
            }}
            maxW={'1240px'}
            mx='auto'
            w='full'
          >
            <Navigation />
          </Box>
        </Box>
      </Box>

      {
        path.pathname === '/' &&
        <Slider />
      }

      <Box
        maxW={'1240px'}
        px={{
          base : '10px',
          md : '20px'
        }}
        mx='auto'
        w='full'
      >
        {children}
      </Box>

      <Box justifySelf='flex-end' bg='#111' p='30px 0' mt='auto'>
        <Box
          px={{
            base : '10px',
            md : '20px'
          }}
          maxW={'1240px'}
          mx='auto'
          w='full'
        >
          <Footer />
        </Box>
      </Box>
      <ScrollToTopBtn />
    </Box>
  )
}

export default Layout
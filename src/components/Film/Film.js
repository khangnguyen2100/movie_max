import React, {useState} from 'react'
import { Box, Flex, Text, Skeleton,Badge, useBreakpointValue } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Film = ({category, id, score, imageUrl, href, title}) => {
  const navigate = useNavigate()
  const [imageLoaded, setImageLoaded] = useState(false);
  const minHeightValue = useBreakpointValue({
    base : '30vh',
    md : '40vh',
    lg : '43vh'
  })
  const handleFilmClick = () => {
    navigate(`/detail/${category}/${id}`)
  }
  return (
    <Flex 
      onClick={handleFilmClick}
      direction='column' justify='space-between'
      cursor='pointer'
      _hover={{
        color : 'primaryColor'
      }}
      > 
      <Box position='relative'>
        <Skeleton
          isLoaded={imageLoaded}
          style={{
            borderRadius : '7px'
          }}
          startColor='rgba(50,138,241,.05)' endColor='rgba(50,138,241,.15)' 
          minH={minHeightValue}
        >
          <LazyLoadImage 
            src={imageUrl}
            effect="blur"
            style={{
              borderRadius : '7px',
              minHeight : minHeightValue,
              objectFit : "cover"
            }}
            afterLoad={() => setImageLoaded(true)}  
          /> 
        </Skeleton>
        {score && (
          <Box position='absolute' top='10px' right='10px' >
            <Badge bg={'bgScoreColor'} fontWeight='bold' fontSize='14px' display='flex' alignItems='center' color='#fff'>
              {score} 
              <StarIcon color="starColor" ml='3px' />
            </Badge>
          </Box>
        )}
      </Box>
      <Box w='full' mt='5px'>
        <Text 
          w='full' fontWeight='bold' fontSize={{base : '13px', md : "15px"}} textTransform='capitalize'  textAlign='center'
        >
        {
          title.includes('[Vietsub]') ? title.replace('[Vietsub]','') : title
        }
        </Text>
      </Box>
    </Flex>
  )
}

export default Film
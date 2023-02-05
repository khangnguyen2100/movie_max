import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
const NotFound = () => {
  return (
    <Flex align='center' justify={'center'} mt='30px' flexDirection={['column', 'row']}>
      {/* image */}
      <Box w={['full', '50%']}>
        <Image  srcSet='/images/page-not-found.png' loading='eager' src='/images/page-not-found.png' alt='404' />
      </Box>
      {/* content */}
      <Box ml={['0', '50px']} mt={['40px', '0']}>
        <Text
          fontSize={['32px', '38px']}
          fontWeight='700'
        >
          Page Not Found
        </Text>
        <Box
          fontSize={['16px', '20px']}
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
      </Box>
    </Flex>
  )
}

export default NotFound
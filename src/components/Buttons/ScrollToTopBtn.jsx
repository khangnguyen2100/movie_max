import React, {useState, useEffect, memo} from 'react';
import { ArrowUpIcon } from '@chakra-ui/icons';
import { Button, Icon } from '@chakra-ui/react'; 
const ScrollToTopBtn = () =>{
  const [visible, setVisible] = useState(false)
  
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 700){
      setVisible(true)
    } 
    else if (scrolled <= 700){
      setVisible(false)
    }
  };
  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
    });
  };
  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  },[])
  return (
    <Button
      position='fixed' bottom='50px' right={'30px'}
      zIndex='100'
      style={{
        visibility: visible ? 'visible' : 'hidden',
        transform : visible ? 'translateX(0)' :'translateX(100px)',
        transition : "all .3s ease-in-out",
      }} 
      bg='backgroundBtnColor'
      _hover={{
        backgroundColor : 'backgroundBtnColor_hover',
      }}
      onClick={scrollToTop}
    >
     <Icon as={ArrowUpIcon}
      color='primaryColor'
      w={6} h={6} 
      transition='0.2s'
      _hover={{
        transform : 'translateY(-2px)',
        transition : '0.2s'
      }}
     />
    </Button>
  );
}
  
export default memo(ScrollToTopBtn);
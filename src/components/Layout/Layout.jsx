import React from "react";
import { Box } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

import Navigation from "../Navigation/Navigation";
import Slider from "../Home/Slider";
import Footer from "../Footer/Footer";
import ScrollToTopBtn from "../Buttons/ScrollToTopBtn";
const Layout = ({ children }) => {
  const path = useLocation();
  return (
    <Box
      minHeight={"100vh"}
      position={"relative"}
      fontFamily="body"
      fontSize="16px"
      maxW="full"
      color="textColor"
      display={"flex"}
      flexDirection={"column"}
      backgroundColor={"bgColor"}
      bg={"linear-gradient(170deg,hsl(219, 41%, 10%), hsl(219, 41%, 3%))"}
    >

      {/* navigation layout */}
      <Navigation />

      {/* Show slider at Home page */}
      {path.pathname === "/" && <Slider />}

      {/* main content */}
      <Box mt='55px' layerStyle={'containerStyles'}>
        {children}
      </Box>

      {/* footer  */}

      <Box mt="auto">
        <Box justifySelf="flex-end" bg="#111" p="25px 0" mt='250px'>
          <Footer />
        </Box>
      </Box>

      <ScrollToTopBtn />
    </Box>
  );
};

export default Layout;

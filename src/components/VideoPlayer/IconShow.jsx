import React, {memo} from "react";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { AiOutlinePause } from "react-icons/ai";
import { FiPlay } from "react-icons/fi";
const IconShow = ({status}) => {
  return (
    <Box
      position={"absolute"}
      top="50%"
      left="50%"
      transform={"translate(-50%,-50%)"}
      zIndex={"55"}
      cursor="pointer"
    >
      <motion.div
        animate={{ scale: 1.5, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
      {
        status === 'play' ? 
        <FiPlay size={45} /> : 
        <AiOutlinePause size={45} />
      }
      </motion.div>
    </Box>
  );
};

export default memo(IconShow);

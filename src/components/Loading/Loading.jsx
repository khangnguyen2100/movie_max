import React from "react";
import { Box } from "@chakra-ui/react";
import { ThreeDots } from "react-loader-spinner";
import { colors } from "src/utils/chakraConfig";
const Loading = () => {
  return (
    <Box
      display={'block'} my='20px'
    >
      <ThreeDots
        height="50"
        width="50"
        color={colors.primaryColor}
        ariaLabel="loading"
      />
    </Box>
  );
};

export default Loading;

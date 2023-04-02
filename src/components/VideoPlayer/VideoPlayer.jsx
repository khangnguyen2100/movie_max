/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from "@chakra-ui/react";
import "@vime/core/themes/default.css";
import "@vime/core/themes/light.css";
import {
  Embed
} from "@vime/react";
import React, { memo } from "react";
function VideoPlayer({embedSrc = ''}) {
  return (
    <Box position={"relative"} w='full' h={'full'}>
      <Embed
        embedSrc={embedSrc}
        params={{ autoplay: 1, muted: 1, controls: 0 }}
        mediaTitle="Agent 327: Operation Barbershop"
        origin="https://www.youtube-nocookie.com"
      />
    </Box>
  );
}
export default memo(VideoPlayer);

import React, {memo} from 'react'
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
} from "@chakra-ui/react";
import ButtonBg from "../Buttons/ButtonBg";

const ModalPopup = ({modalOpen, setModalOpen, goToNextEpisode}) => {
  console.log('ModalPopup');
  return (
    <Modal
        onClose={() => setModalOpen(false)}
        isOpen={modalOpen}
        motionPreset="slideInBottom"
        position={"absolute"}
        top="50%"
        left="50%"
        transform={"translate(-50%,-50%)"}
        zIndex={"55"}
      >
        <ModalOverlay />
        <ModalContent bg="bgColor" height="minContent" m={"auto"}>
          <ModalHeader color="textColor">Episode Ended</ModalHeader>
          <ModalCloseButton color="textColor" />
          <ModalFooter
            display={"flex"}
            justifyContent="space-between"
            alignItems={"center"}
            w="full"
          >
            <Button
              fontWeight={"light"}
              variant="ghost"
              mr={3}
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
            <Box onClick={() => goToNextEpisode()}>
              <ButtonBg>Go To next episode</ButtonBg>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}

export default memo(ModalPopup)
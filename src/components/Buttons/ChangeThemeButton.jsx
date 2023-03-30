import React from 'react'
import { MoonIcon, SunIcon} from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
const ChangeThemeButton = ({colorMode, toggleColorMode}) => {
  return (
    <Button onClick={toggleColorMode}>
      {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
    </Button>
  )
}

export default ChangeThemeButton
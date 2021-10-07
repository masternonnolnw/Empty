import React from 'react';
import { useColorMode, Box } from '@chakra-ui/core';
import { IconButton } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export default function ThemeToggler() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box textAlign="right" py={4} mr={12}>
      <IconButton
        icon = {colorMode === 'light' ? <MoonIcon/> : <SunIcon/>}
        onClick={toggleColorMode}
        variant="ghost"
      />
    </Box>
  );
}
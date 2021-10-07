import React from 'react';
import { useColorMode, Box } from '@chakra-ui/core';
import { IconButton } from '@chakra-ui/react';

export default function ThemeToggler() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box textAlign="right" py={4} mr={12}>
      <h1>Theme</h1>
      <IconButton
        icon = {'moon'}
        onClick={toggleColorMode}
        variant="ghost"
      />
      <IconButton
        icon = {colorMode === 'light' ? 'moon' : 'sun'}
        onClick={toggleColorMode}
        variant="ghost"
      />
    </Box>
  );
}
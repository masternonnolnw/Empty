import React from 'react';
import {
  ThemeProvider,
  theme,
  ColorModeProvider,
  CSSReset
} from '@chakra-ui/core';
import ThemeToggler from './Components/ThemeToggler';
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        <h1>test</h1>
        <ThemeToggler />
      </ColorModeProvider>
    </ThemeProvider>
  );
}
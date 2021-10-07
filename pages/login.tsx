import React from 'react';
import {
  ThemeProvider,
  theme,
  ColorModeProvider,
  CSSReset
} from '@chakra-ui/core';
import ThemeToggler from './Components/ThemeToggler';
import LoginForm from './LoginForm';
export default function App() {
    return (
      <ThemeProvider theme={theme}>
        <ColorModeProvider>
          <CSSReset />
          <ThemeToggler />
          <LoginForm />
        </ColorModeProvider>
      </ThemeProvider>
    );
  }
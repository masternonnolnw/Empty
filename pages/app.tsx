import {Flex,Input,Text,IconButton,Link,ChakraProvider  } from "@chakra-ui/react";
import React from "react";
import MainContent from './content'

export default function MyApp() {
  return (
    <ChakraProvider>
      <Flex
        h = "100vh"
        flexDir = "column"
        overflow = "hidden"
        w = "100%"
      >
        {/* NavBar */}
        <Flex
          h = "5vh"
          flexDir = "row"
          w = "100%"
          backgroundColor = "gray"
        >
          <Link href = '/login'>login</Link>
        </Flex>

        {/* Body */}
        <Flex
          h = "100%"
          flexDir = "row"
          overflow = "hidden"
        >

          {/* SideBar */}
          <Flex
            w = "20%"
            flexDir = "column"
            alignItems = "center"
            backgroundColor = "black"
          >
            
          </Flex>

          {/* Content */}
          <MainContent />

          {/* Last */}
          <Flex
            w = "30%"
            flexDir = "column"
            alignItems = "center"
            backgroundColor = "pink"
          >
            
          </Flex>

        </Flex>
      </Flex>
  </ChakraProvider>
  )
}

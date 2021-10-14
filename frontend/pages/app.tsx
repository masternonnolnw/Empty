import {
  Flex,
  Input,
  Text,
  IconButton,
  Link,
  ChakraProvider,
} from "@chakra-ui/react";
import { Box, Spacer } from "@chakra-ui/layout";
import MainContent from "../components/content";
import ThemeToggler from "../components/ThemeToggler";
import SideBar from "../components/sideBar";
import { loadGetInitialProps } from "next/dist/shared/lib/utils";
export default function MyApp() {
  return (
    <MainContent />

    // <Flex h="100vh" flexDir="column" overflow="hidden" w="100%">
    //   {/* Body */}
    //   <Flex h="100%" flexDir="row" overflow="hidden">
    //     {/* SideBar */}
    //     <Flex w="20%" flexDir="column" alignItems="center"></Flex>

    //     {/* Content */}

    //     {/* Last */}
    //     <Flex w="30%" flexDir="column" alignItems="center"></Flex>
    //   </Flex>
    // </Flex>
  );
}

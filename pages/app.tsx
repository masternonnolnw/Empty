import {
  Flex,
  Input,
  Text,
  IconButton,
  Link,
  ChakraProvider,
} from "@chakra-ui/react";
import MainContent from "./content";
import ThemeToggler from "../components/ThemeToggler";

export default function MyApp() {
  return (
    <MainContent />

    // <Flex h="100vh" flexDir="column" overflow="hidden" w="100%">
    //   <ThemeToggler />
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

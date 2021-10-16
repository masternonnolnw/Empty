import { ChakraProvider } from "@chakra-ui/react";
import MyTheme from "./styles/theme";
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
export default MyApp;

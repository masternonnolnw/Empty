import Link from "next/link";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./app";
import Login from "./login";
const IndexPage = () => <Login />;

export default IndexPage;
//npx json-server -p 3500 -w frontend/pages/data.json

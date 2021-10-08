import Link from 'next/link'
import { ChakraProvider } from "@chakra-ui/react"
import App from './app'
import Login from './login'
const IndexPage = () => (
  <App />
)

export default IndexPage
//npx json-server -p 3500 -w pages/data.json
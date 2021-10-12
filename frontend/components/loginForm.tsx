import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import Icon from "@chakra-ui/icon";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { CircularProgress } from "@chakra-ui/progress";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import ErrorMessage from "./ErrorMessage";

export default function LoginForm() {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const baseURL = process.env.NEXT_PUBLIC_API_URL;
      const token = await axios.post(`${baseURL}/login`, {
        username,
        password,
      });
      if (typeof window !== "undefined") {
        console.log("we are running on the client");
        localStorage.setItem("token", `${token.data}`);
      } else {
        console.log("we are running on the server");
      }
      setIsLoggedIn(true);
      setIsLoading(false);
      setShowPassword(false);
      window.location.href = "/app";
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        setError(err.response.data);
        setIsLoading(false);
        setEmail("");
        setPassword("");
        setShowPassword(false);
      }
    }
    // catch (error) {
    // console.log(error);
    // setError("Error");
    // setIsLoading(false);
    // setEmail("");
    // setPassword("");
    // setShowPassword(false);
    // }
  };
  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box
        p={8}
        maxWidth="500px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
      >
        <Box textAlign="center">
          <Heading>Login</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleSubmit}>
            {error && <ErrorMessage message={error} />}
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                placeholder="username"
                size="lg"
                onChange={(event) => setEmail(event.currentTarget.value)}
                value={username}
              />
            </FormControl>
            <FormControl isRequired mt={6}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="*******"
                  size="lg"
                  onChange={(event) => setPassword(event.currentTarget.value)}
                  value={password}
                />
                <InputRightElement alignSelf="center" mr="8px">
                  <Button
                    h="1.5rem"
                    size="sm"
                    onClick={handlePasswordVisibility}
                    _focus={{
                      outline: "none",
                    }}
                  >
                    {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button
              colorScheme="teal"
              variant="outline"
              type="submit"
              width="full"
              mt={4}
              _focus={{
                outline: "none",
              }}
            >
              {isLoading ? (
                <CircularProgress isIndeterminate size="24px" color="teal" />
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}

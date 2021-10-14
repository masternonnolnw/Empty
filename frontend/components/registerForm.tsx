import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import Icon from "@chakra-ui/icon";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Box, Flex, Heading, Link, Spacer } from "@chakra-ui/layout";
import { CircularProgress } from "@chakra-ui/progress";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import ErrorMessage from "./ErrorMessage";

export default function registerForm() {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordVisibility = () => setShowPassword(!showPassword);
  const [showCheckPassword, setShowCheckPassword] = useState(false);
  const handleCheckPasswordVisibility = () =>
    setShowCheckPassword(!showCheckPassword);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (password != checkPassword) {
      setError("password not match");
      setIsLoading(false);
      setShowPassword(false);
    } else {
      try {
        const baseURL = process.env.NEXT_PUBLIC_API_URL;
        const token = await axios.post(`${baseURL}/users`, {
          username,
          password,
        });
        // console.log(token);
        // console.log(token.data);
        // console.log(typeof token.data);else {
        window.location.href = "/login";
      } catch (error) {
        const err = error as AxiosError;
        if (err.response) {
          setError(err.response.data);
          setIsLoading(false);
          setEmail("");
          setPassword("");
          setCheckPassword("");
          setShowPassword(false);
          setShowCheckPassword(false);
        }
      }
    }
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
          <Heading>Register</Heading>
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
                  placeholder="password"
                  size="lg"
                  onChange={(event) => setPassword(event.currentTarget.value)}
                  value={password}
                />
                <InputRightElement alignSelf="center" mr="8px" mt="1">
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
            <FormControl isRequired mt={6}>
              <InputGroup>
                <Input
                  type={showCheckPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  size="lg"
                  onChange={(event) =>
                    setCheckPassword(event.currentTarget.value)
                  }
                  value={checkPassword}
                />
                <InputRightElement alignSelf="center" mr="8px" mt="1">
                  <Button
                    h="1.5rem"
                    size="sm"
                    onClick={handleCheckPasswordVisibility}
                    _focus={{
                      outline: "none",
                    }}
                  >
                    {showCheckPassword ? <ViewOffIcon /> : <ViewIcon />}
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
            <Flex>
              <Spacer />
              <Link
                href="/login"
                alignSelf="flex-end"
                mt="3"
                _focus={{
                  outline: "none",
                }}
              >
                Login
              </Link>
            </Flex>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}

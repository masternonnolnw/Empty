import {
  Flex,
  Input,
  Text,
  IconButton,
  Stack,
  HStack,
  VStack,
  Box,
  Heading,
  StackDivider,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import {
  ArrowUpIcon,
  CheckIcon,
  SearchIcon,
  SmallCloseIcon,
} from "@chakra-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";

const baseURL = "http://localhost:3500/arr";
// "https://jsonplaceholder.typicode.com/posts"
export default function Content() {
  const [title, setTitle] = useState(null);
  const handleChangeTitle = (event) => setTitle(event.target.value);

  const [body, setBody] = useState(null);
  const handleChangeBody = (event) => setBody(event.target.value);

  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`${baseURL}`).then((response) => {
      setPost(response.data);
      // console.log(response.data)
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (title && body) {
        await axios.post(`${baseURL}`, {
          title: `${title}`,
          body: `${body}`,
          like: 0,
        });
        const { data } = await axios.get(`${baseURL}`);
        setPost(data);
        setTitle("");
        setBody("");
      }
    } catch (error) {}
  };
  async function upLike(pos) {
    await axios.put(`${baseURL}/${pos.id}`, {
      title: `${pos.title}`,
      body: `${pos.body}`,
      like: pos.like + 1,
    });
    const { data } = await axios.get(`${baseURL}`);
    setPost(data);
  }

  async function deletePost(id) {
    await axios.delete(`${baseURL}/${id}`);
    const { data } = await axios.get(`${baseURL}`);
    setPost(data);
  }

  {
    /*======================================================================*/
  }

  if (!post) {
    return (
      <Flex
        h="100vh"
        w="100%"
        flexDir="column"
        alignItems="center"
        backgroundColor="white"
      />
    );
  }

  return (
    <Flex
      h="100%"
      w="100%"
      flexDir="column"
      alignItems="center"
      overflow="hidden"
    >
      <Flex w="70%" flexDir="column" alignItems="center" marginTop="7">
        <form onSubmit={handleSubmit}>
          <FormControl id="Tiltle" isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              placeholder="Title"
              size="lg"
              w="80%"
              value={title}
              onChange={handleChangeTitle}
            />
          </FormControl>

          <FormControl id="Body" isRequired>
            <FormLabel>Body</FormLabel>
            <Input
              placeholder="Body"
              size="lg"
              w="80%"
              value={body}
              onChange={handleChangeBody}
            />
          </FormControl>

          <IconButton
            colorScheme="blue"
            aria-label="Search database"
            marginLeft="10"
            type="submit"
            icon={<CheckIcon />}
          />
        </form>
      </Flex>

      <Stack
        spacing={8}
        w="90%"
        marginTop="5" /*divider={<StackDivider borderColor="gray.200" />}*/
      >
        {post.map((pos) => (
          <Box p={5} shadow="md" borderWidth="1px">
            <Heading fontSize="xl">{pos.title}</Heading>
            <Text mt={4}>{pos.body}</Text>
            <Flex>
              <IconButton
                colorScheme="blue"
                aria-label="Search database"
                marginTop="3"
                marginLeft="3"
                onClick={() => upLike(pos)}
                icon={<ArrowUpIcon />}
                isRound
              />
              <Text marginTop="3" marginLeft="3" fontSize="2xl">
                {pos.like}
              </Text>
              <IconButton
                colorScheme="red"
                aria-label="Search database"
                marginTop="3"
                marginLeft="3"
                onClick={() => deletePost(pos.id)}
                icon={<SmallCloseIcon />}
                isRound
              />
            </Flex>
          </Box>
        ))}
      </Stack>
    </Flex>
  );
}

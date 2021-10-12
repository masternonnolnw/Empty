import { Avatar } from "@chakra-ui/avatar";
import { Button, IconButton } from "@chakra-ui/button";
import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";
import { FormControl } from "@chakra-ui/form-control";
import { ArrowDownIcon, ArrowUpIcon, WarningTwoIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/layout";
import { MenuButton } from "@chakra-ui/menu";
import { Select } from "@chakra-ui/select";
import { tokenToCSSVar } from "@chakra-ui/styled-system";
import { Tag } from "@chakra-ui/tag";
import { Textarea } from "@chakra-ui/textarea";
import axios from "axios";
import { useEffect, useState } from "react";

const baseURL = process.env.NEXT_PUBLIC_API_URL;
// "https://jsonplaceholder.typicode.com/posts"
export default function Content() {
  const [title, setTitle] = useState(null);
  const handleChangeTitle = (event) => setTitle(event.target.value);

  const [body, setBody] = useState(null);
  const handleChangeBody = (event) => setBody(event.target.value);

  const [post, setPost] = useState(null);

  const username = "MaStEr";
  var token = "0";
  var viewType = "top";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token") as string;
  }
  useEffect(() => {
    axios.get(`${baseURL}/posts/${token}/${viewType}`).then((response) => {
      setPost(response.data);
      console.log(response.data);
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (title && body) {
        await axios.post(`${baseURL}/posts`, {
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
  // app.put("/posts/:userid/:postid/:past/:cur"
  async function upLike(pos) {
    var curStatus = 0;
    if (pos.status == 1) {
      curStatus = 0;
    } else {
      curStatus = 1;
    }
    try {
      console.log(`${baseURL}/posts/${token}/${pos.id}/${curStatus}`);
      const newPost = await axios.put(
        `${baseURL}/posts/${token}/${pos.id}/${curStatus}`
      );
      setPost(newPost.data);
      console.log(newPost.data);
    } catch {
      console.log(Error);
    }
  }

  async function downLike(pos) {
    var curStatus = 0;
    if (pos.status == -1) {
      curStatus = 0;
    } else {
      curStatus = -1;
    }
    try {
      const newPost = await axios.put(
        `${baseURL}/posts/${token}/${pos.id}/${curStatus}`
      );
      setPost(newPost.data);
      console.log(newPost.data);
    } catch {
      console.log(Error);
    }
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
      overflowY="auto"
      css={{
        "&::-webkit-scrollbar": {
          width: "4px",
        },
        "&::-webkit-scrollbar-track": {
          width: "4px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#C9C9C9",
          borderRadius: "24px",
        },
      }}
    >
      {/*  ===================== Post Part =====================  */}
      <Flex w="70%" flexDir="column" alignItems="center" marginTop="7">
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="2xl" w="100%">
          <form onSubmit={handleSubmit}>
            <Flex marginBottom="8">
              <Avatar
                name="Dan Abrahmov"
                src="https://bit.ly/dan-abramov"
                marginRight="2"
              />
              <Text marginRight="5" alignSelf="center">
                {username}
              </Text>
              <FormControl id="Tiltle" isRequired>
                <Select
                  w="100%"
                  placeholder="Title"
                  size="lg"
                  onChange={handleChangeTitle}
                  value={title}
                  borderRadius="xl"
                  _focus={{
                    outline: "none",
                  }}
                >
                  <option value="study">Study</option>
                  <option value="food">Food</option>
                  <option value="facilities">Facilities</option>
                  <option value="people">People</option>
                </Select>
              </FormControl>
            </Flex>
            <FormControl id="Body" isRequired>
              <Textarea
                value={body}
                onChange={handleChangeBody}
                placeholder="Body"
                size="lg"
                overflowY="auto"
                padding="2"
                css={{
                  "&::-webkit-scrollbar": {
                    width: "5px",
                  },
                  "&::-webkit-scrollbar-track": {
                    width: "5px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "#C9C9C9",
                    borderRadius: "24px",
                  },
                }}
              />
              {/* <Input
                placeholder="Body"
                padding="5"
                borderRadius="full"
                size="md"
                w="100%"
                h="60px"
                value={body}
                onChange={handleChangeBody}
              /> */}
            </FormControl>

            {/* <IconButton
              colorScheme="blue"
              aria-label="Search database"
              marginLeft="10"
              type="submit"
              icon={<CheckIcon />}
            /> */}
          </form>
        </Box>
      </Flex>
      {/* ===================== End Post Part =====================  */}
      {/* ===================== Sort Seleted =====================  */}
      <Box
        p={5}
        marginTop="5"
        shadow="md"
        borderWidth="1px"
        borderRadius="xl"
        w="80%"
      >
        <Flex FlexDir="rows" alignItems="center">
          <WarningTwoIcon />
          <Text marginLeft="2">Hot</Text>
        </Flex>
      </Box>
      {/* ===================== End Sort Seleted =====================  */}

      {/* ===================== Box =====================  */}
      <Stack
        spacing={8}
        w="90%"
        marginTop="5" /*divider={<StackDivider borderColor="gray.200" />}*/
        marginBottom="8"
      >
        {post.map((pos) => (
          <Flex p={5} shadow="md" borderWidth="1px" borderRadius="xl" w="100%">
            {/* =========================== Heading ======================== */}
            <Flex
              flexDir="column"
              alignItems="center"
              marginRight="10"
              alignSelf="center"
            >
              <IconButton
                variant="ghost"
                colorScheme={pos.status == 1 ? "green" : "white"}
                aria-label="Search database"
                marginTop="3"
                marginLeft="3"
                onClick={() => upLike(pos)}
                icon={<ArrowUpIcon />}
                isRound
                fontSize="3xl"
                _focus={{
                  outline: "none",
                }}
                _active={{
                  bg: "none",
                }}
              />

              <Text marginTop="3" marginLeft="3" fontSize="2xl">
                {pos.totallike}
              </Text>
              <IconButton
                variant="ghost"
                colorScheme={pos.status == -1 ? "red" : "white"}
                aria-label="Search database"
                marginTop="3"
                marginLeft="3"
                onClick={() => downLike(pos)}
                icon={<ArrowDownIcon />}
                isRound
                fontSize="3xl"
                _focus={{
                  outline: "none",
                }}
                _active={{
                  bg: "none",
                }}
              />
            </Flex>

            <Flex flexDir="column">
              <Flex flexDir="row" marginBottom="5">
                <Avatar
                  name="Dan Abrahmov"
                  src="https://bit.ly/dan-abramov"
                  marginRight="5"
                  size="md"
                />
                <Text marginRight="5" alignSelf="center">
                  {username}
                </Text>
              </Flex>
              {/* =========================== End Heading ======================== */}
              {/* =========================== Body ======================== */}
              <Flex flexDir="column">
                <Tag w="max">{pos.title}</Tag>
                <Text
                  fontSize="lg"
                  paddingLeft="10"
                  marginTop="2"
                  wordBreak="break-word"
                >
                  {pos.body}
                </Text>
              </Flex>

              {/* <IconButton
                  colorScheme="red"
                  aria-label="Search database"
                  marginTop="3"
                  marginLeft="3"
                  onClick={() => deletePost(pos.id)}
                  icon={<SmallCloseIcon />}
                  isRound
                  w="10px"
                /> */}
            </Flex>
            {/* =========================== End Body ======================== */}
          </Flex>
        ))}
      </Stack>
      {/* ===================== End Box =====================  */}
    </Flex>
  );
}

import { Avatar } from "@chakra-ui/avatar";
import { Button, IconButton } from "@chakra-ui/button";
import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";
import { FormControl } from "@chakra-ui/form-control";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CheckIcon,
  WarningTwoIcon,
} from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import {
  Box,
  Flex,
  Heading,
  Link,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/layout";
import { MenuButton } from "@chakra-ui/menu";
import { Select } from "@chakra-ui/select";
import { tokenToCSSVar } from "@chakra-ui/styled-system";
import { Tag } from "@chakra-ui/tag";
import { Textarea } from "@chakra-ui/textarea";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import ThemeToggler from "../components/ThemeToggler";
import SideBar from "../components/sideBar";

const baseURL = process.env.NEXT_PUBLIC_API_URL;
// "https://jsonplaceholder.typicode.com/posts"
export default function Content() {
  const [title, setTitle] = useState(null);
  const handleChangeTitle = (event) => setTitle(event.target.value);

  const [body, setBody] = useState(null);
  const handleChangeBody = (event) => setBody(event.target.value);

  const [post, setPost] = useState(null);

  const [isTop, setIsTop] = useState(false);
  const handleSetTopViewtype = (event) => typeLoad(event.target.value);

  const [viewType, setViewType] = useState("hot");
  const [username, setUsername] = useState(null);

  const username1 = "MaStEr";
  var token = "0";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token") as string;
  }
  if (token == "") {
    token = "0";
  }
  useEffect(() => {
    try {
      console.log(token);
      console.log(`${baseURL}/users/${token}`);
      axios.get(`${baseURL}/users/${token}`).then((response) => {
        setUsername(response.data);
        console.log(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [token]);
  useEffect(() => {
    try {
      if (token == "") {
        token = "0";
      }
      console.log(token);

      var timeframe = "";
      if (viewType == "topday") timeframe = "day";
      if (viewType == "topweek") timeframe = "week";
      if (viewType == "topmonth") timeframe = "month";
      if (viewType == "topyear") timeframe = "year";
      if (viewType == "topalltime") timeframe = "alltime";
      console.log(`${baseURL}/posts/${token}/${viewType}${timeframe}`);
      axios
        .get(`${baseURL}/posts/${token}/${viewType}${timeframe}`)
        .then((response) => {
          setPost(response.data);
          console.log(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (title && body) {
        const newPost = await axios.post(`${baseURL}/posts/${token}`, {
          title: `${title}`,
          body: `${body}`,
        });
        console.log(newPost.data);
        setPost(newPost.data);
        setTitle("");
        setBody("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // app.put("/posts/:userid/:postid/:past/:cur"
  async function upLike(pos) {
    try {
      var curStatus = 0;
      if (pos.status == 1) {
        curStatus = 0;
      } else {
        curStatus = 1;
      }
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
    try {
      var curStatus = 0;
      if (pos.status == -1) {
        curStatus = 0;
      } else {
        curStatus = -1;
      }
      const newPost = await axios.put(
        `${baseURL}/posts/${token}/${pos.id}/${curStatus}`
      );
      setPost(newPost.data);
      console.log(newPost.data);
    } catch {
      console.log(Error);
    }
  }

  async function typeLoad(type: string) {
    try {
      if (token == "") {
        token = "0";
      }
      console.log(token);
      setViewType(type);
      //localhost:8000/posts/1633769155834/top?timeframe='day'
      var timeframe = "";
      if (type == "topday") {
        timeframe = "?timeframe=day";
        type = "top";
      } else if (type == "topweek") {
        timeframe = "?timeframe=week";
        type = "top";
      } else if (type == "topmonth") {
        timeframe = "?timeframe=month";
        type = "top";
      } else if (type == "topyear") {
        timeframe = "?timeframe=year";
        type = "top";
      } else if (type == "topalltime") {
        timeframe = "?timeframe=alltime";
        type = "top";
      }
      console.log(`${baseURL}/posts/${token}/${type}${timeframe}`);
      axios
        .get(`${baseURL}/posts/${token}/${type}${timeframe}`)
        .then((response) => {
          setPost(response.data);
          console.log(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  }

  // async function deletePost(id) {
  //   await axios.delete(`${baseURL}/${id}`);
  //   const { data } = await axios.get(`${baseURL}`);
  //   setPost(data);
  // }

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
    <>
      <Flex h="10vh" shadow="md">
        {username == null ? (
          <Link
            href="/login"
            ml="7"
            mt="5"
            _focus={{
              outline: "none",
            }}
          >
            Login
          </Link>
        ) : (
          <Text>{username}</Text>
        )}

        <Spacer />
        <ThemeToggler />
      </Flex>
      <Flex>
        <Flex w="17%" h="90vh">
          <SideBar
            handleSetTopViewtype={handleSetTopViewtype}
            typeLoad={typeLoad}
            viewType={viewType}
            setIsTop={setIsTop}
            isTop={isTop}
          />
        </Flex>
        <Flex w="58%" h="90vh">
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
              <Box
                p={5}
                shadow="md"
                borderWidth="1px"
                borderRadius="2xl"
                w="100%"
              >
                <form onSubmit={handleSubmit}>
                  <Flex marginBottom="8">
                    <Avatar
                      name="Dan Abrahmov"
                      src="https://bit.ly/dan-abramov"
                      marginRight="2"
                    />
                    <Text marginRight="5" alignSelf="center">
                      {username1}
                    </Text>
                    <FormControl id="Tiltle" isRequired>
                      <Select
                        w="100%"
                        placeholder="Title"
                        size="lg"
                        onChange={handleChangeTitle}
                        isDisabled={post[0].status == 99}
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
                      isDisabled={post[0].status == 99}
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

                  <Button
                    colorScheme="blue"
                    aria-label="Post"
                    marginLeft="10"
                    type="submit"
                    mt="15px"
                    _focus={{
                      outline: "none",
                    }}
                    _active={{
                      bg: "none",
                    }}
                    isDisabled={post[0].status == 99}
                  >
                    <Text>post</Text>
                  </Button>
                </form>
              </Box>
            </Flex>
            {/* ===================== End Post Part =====================  */}
            {/* ===================== Please login =====================  */}
            {post[0].status == 99 ? (
              <Flex
                p={5}
                shadow="md"
                borderWidth="1px"
                borderRadius="xl"
                w="95%"
                mt="5"
                alignItems="center"
              >
                <Text>Please</Text>
                <Button
                  margin="3"
                  size="md"
                  _focus={{
                    outline: "none",
                  }}
                  onClick={() => (window.location.href = "/login")}
                >
                  <Link
                    href="/login"
                    _focus={{
                      outline: "none",
                    }}
                  >
                    Login
                  </Link>
                </Button>
                <Text>or</Text>
                <Button
                  margin="3"
                  size="md"
                  _focus={{
                    outline: "none",
                  }}
                  onClick={() => (window.location.href = "/register")}
                >
                  <Link
                    href="/register"
                    _focus={{
                      outline: "none",
                    }}
                  >
                    Sign up
                  </Link>
                </Button>
                <Text> to post.</Text>
              </Flex>
            ) : (
              ""
            )}
            {/* ===================== End please login =====================  */}

            {/* ===================== Sort Seleted =====================  */}
            <Box
              p={5}
              marginTop="5"
              shadow="md"
              borderWidth="1px"
              borderRadius="xl"
              w="80%"
            >
              <Flex alignItems="center">
                <Button
                  _focus={{
                    outline: "none",
                  }}
                  _active={{
                    bg: "none",
                  }}
                  onClick={() => {
                    typeLoad("hot");
                    setIsTop(false);
                  }}
                  colorScheme={viewType == "hot" ? "teal" : "gray"}
                >
                  <WarningTwoIcon />
                  <Text marginLeft="2">Hot</Text>
                </Button>
                <Button
                  _focus={{
                    outline: "none",
                  }}
                  _active={{
                    bg: "none",
                  }}
                  onClick={() => {
                    typeLoad("new");
                    setIsTop(false);
                  }}
                  colorScheme={viewType == "new" ? "teal" : "gray"}
                  ml="10px"
                >
                  <WarningTwoIcon />
                  <Text marginLeft="2">New</Text>
                </Button>
                <Button
                  _focus={{
                    outline: "none",
                  }}
                  _active={{
                    bg: "none",
                  }}
                  onClick={() => {
                    typeLoad("topday");
                    setIsTop(true);
                  }}
                  colorScheme={viewType.length > 4 ? "teal" : "gray"}
                  ml="10px"
                >
                  <WarningTwoIcon />
                  <Text marginLeft="2">Top</Text>
                </Button>
                {isTop ? (
                  <Select
                    w="max"
                    onChange={handleSetTopViewtype}
                    value={viewType.length < 4 ? "topday" : viewType}
                    variant="outline"
                    ml="3"
                    borderRadius="3xl"
                    _focus={{
                      outline: "none",
                    }}
                    _active={{
                      bg: "none",
                    }}
                    textAlign="center"
                  >
                    {/* day week month year alltime */}
                    <option value="topday">day</option>
                    <option value="topweek">week</option>
                    <option value="topmonth">month</option>
                    <option value="topyear">year</option>
                    <option value="topalltime">alltime</option>
                  </Select>
                ) : (
                  ""
                )}
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
                <Flex
                  p={5}
                  shadow="md"
                  borderWidth="1px"
                  borderRadius="md"
                  w="100%"
                >
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
                      isDisabled={pos.status == 99}
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
                      isDisabled={pos.status == 99}
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

                  <Flex flexDir="column" w="100%">
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
                      <Text marginRight="5" alignSelf="center">
                        {moment(moment()).diff(pos.date, "minutes") == 0
                          ? "Just now"
                          : moment(moment()).diff(pos.date, "minutes") <= 10
                          ? "posted " +
                            moment(moment()).diff(pos.date, "minutes") +
                            " minutes ago"
                          : moment(pos.date).format("DD/MM/YYYY, h:mm:ss a")}
                        {/* {moment(moment(pos.date).diff(moment(), "minutes"))
                    .utc()
                    .format("MM/DD/YYYY, h:mm:ss a")} */}
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
                    <Link
                      href={"/comment/" + pos.id}
                      alignSelf="flex-end"
                      mr="3"
                      _focus={{
                        outline: "none",
                      }}
                      _active={{
                        bg: "none",
                      }}
                    >
                      Comment
                    </Link>
                  </Flex>
                  {/* =========================== End Body ======================== */}
                </Flex>
              ))}
            </Stack>
            {/* ===================== End Box =====================  */}
          </Flex>
        </Flex>
        <Flex w="25%" h="90vh"></Flex>
      </Flex>
    </>
  );
}

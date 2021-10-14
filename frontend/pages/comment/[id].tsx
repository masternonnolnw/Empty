import { Avatar } from "@chakra-ui/avatar";
import { Button, IconButton } from "@chakra-ui/button";
import { FormControl } from "@chakra-ui/form-control";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import { Flex, Link, Spacer, Text } from "@chakra-ui/layout";
import { Tag } from "@chakra-ui/tag";
import { Textarea } from "@chakra-ui/textarea";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import commentForm from "../../components/commentForm";
import CommentForm from "../../components/commentForm";
import ThemeToggler from "../../components/ThemeToggler";

export default function Comments() {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const [commentData, setCommentData] = useState(null);
  const [body, setBody] = useState(null);
  const handleChangeBody = (event) => setBody(event.target.value);
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (body) {
        const newPost = await axios.post(
          `${baseURL}/comments/${postId}/${token}`,
          {
            body: `${body}`,
          }
        );
        console.log(newPost.data);
        setCommentData(newPost.data);
        setBody("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  var token = "0";
  var username = "MaStEr";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token") as string;
  }
  async function upLike(status, posId, commentId) {
    var curStatus = 0;
    if (status == 1) {
      curStatus = 0;
    } else {
      curStatus = 1;
    }
    try {
      console.log(
        `${baseURL}/comments/${token}/${posId}/${commentId}/${curStatus}`
      );
      const Commentsdata = await axios.put(
        `${baseURL}/comments/${token}/${posId}/${commentId}/${curStatus}`
      );
      // console.log(Commentsdata.data);
      setCommentData(Commentsdata.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function downLike(status, posId, commentId) {
    var curStatus = 0;
    if (status == -1) {
      curStatus = 0;
    } else {
      curStatus = -1;
    }
    try {
      console.log(
        `${baseURL}/comments/${token}/${posId}/${commentId}/${curStatus}`
      );
      const Commentsdata = await axios.put(
        `${baseURL}/comments/${token}/${posId}/${commentId}/${curStatus}`
      );
      // console.log(Commentsdata.data);
      setCommentData(Commentsdata.data);
    } catch (error) {
      console.log(error);
    }
  }
  const router = useRouter();
  const pathData = router.query;
  // console.log(router.asPath);
  // console.log(pathData.id);
  var postId = pathData.id;
  // console.log(pathData);
  useEffect(() => {
    if (postId) {
      if (token == "") {
        token = "0";
      }
      // console.log(token);
      console.log(`${baseURL}/comments/${postId}/${token}`);
      axios.get(`${baseURL}/comments/${postId}/${token}`).then((response) => {
        // console.log(response.data);
        setCommentData(response.data);
      });
    }
  }, [postId]);
  if (!commentData) {
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
        <Spacer />
        <ThemeToggler />
      </Flex>

      <Flex h="90vh">
        <Flex w="17%" h="90vh"></Flex>
        <Flex
          p="3"
          w="58%"
          h="90vh"
          flexDir="column"
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
          <Link
            href="/app"
            alignSelf="flex-end"
            mt="3"
            mr="8"
            _focus={{
              outline: "none",
            }}
            _active={{
              bg: "none",
            }}
          >
            Back
          </Link>
          {/* =========================== Post ======================== */}
          <Flex
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="xl"
            alignSelf="center"
            w="80%"
            h="max"
            mt="8"
            mb="3"
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
                colorScheme={commentData.status == 1 ? "green" : "white"}
                aria-label="Search database"
                marginTop="3"
                marginLeft="3"
                onClick={() => upLike(commentData.status, commentData.id, -1)}
                isDisabled={commentData.status == 99}
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
                {commentData.totallike}
              </Text>
              <IconButton
                variant="ghost"
                colorScheme={commentData.status == -1 ? "red" : "white"}
                aria-label="Search database"
                marginTop="3"
                marginLeft="3"
                //status, posId, commentId
                onClick={() => downLike(commentData.status, commentData.id, -1)}
                isDisabled={commentData.status == 99}
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
                  {moment(moment()).diff(commentData.date, "minutes") == 0
                    ? "Just now"
                    : moment(moment()).diff(commentData.date, "minutes") <= 10
                    ? "posted " +
                      moment(moment()).diff(commentData.date, "minutes") +
                      " minutes ago"
                    : moment(commentData.date).format("DD/MM/YYYY, h:mm:ss a")}
                  {/* {moment(moment(pos.date).diff(moment(), "minutes"))
                    .utc()
                    .format("MM/DD/YYYY, h:mm:ss a")} */}
                </Text>
              </Flex>
              {/* =========================== End Heading ======================== */}
              {/* =========================== Body ======================== */}
              <Flex flexDir="column">
                <Tag w="max">{commentData.title}</Tag>
                <Text
                  fontSize="lg"
                  paddingLeft="10"
                  marginTop="2"
                  wordBreak="break-word"
                >
                  {commentData.body}
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
          {/* =========================== End Post ======================== */}
          <Flex w="70%" m="7" alignSelf="center" flexDir="column">
            <form onSubmit={handleSubmit}>
              <FormControl id="Body" isRequired>
                <Textarea
                  value={body}
                  onChange={handleChangeBody}
                  // isDisabled={post[0].status == 99}
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
                <Button
                  type="submit"
                  alignSelf="center"
                  mt="3"
                  _focus={{
                    outline: "none",
                  }}
                  _active={{
                    bg: "none",
                  }}
                >
                  comment
                </Button>
              </FormControl>
            </form>
          </Flex>
          {commentData.comment.map((comment) => (
            <>
              <CommentForm
                comment={comment}
                postId={postId}
                upLike={upLike}
                downLike={downLike}
              />
              {/* <CommentForm
                comment={comment}
                postId={postId}
                upLike={upLike}
                downLike={downLike}
              /> */}
            </>
          ))}
        </Flex>
        <Flex w="25%" h="90vh"></Flex>
      </Flex>
    </>
  );
}

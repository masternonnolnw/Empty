import { Avatar } from "@chakra-ui/avatar";
import { IconButton } from "@chakra-ui/button";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { Flex, Link, Spacer, Text } from "@chakra-ui/layout";
import { Tag } from "@chakra-ui/tag";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import CommentForm from "../components/commentForm";
import ThemeToggler from "../components/ThemeToggler";

export default function comments() {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const [commentData, setCommentData] = useState(null);
  var token = "0";
  var username = "MaStEr";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token") as string;
  }
  var postId = 1;
  useEffect(() => {
    if (token == "") {
      token = "0";
    }
    console.log(token);
    console.log(`${baseURL}/comments/${postId}/${token}`);
    axios.get(`${baseURL}/comments/${postId}/${token}`).then((response) => {
      console.log(response.data);
      setCommentData(response.data);
    });
  }, []);
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
        <Flex w="20%" h="90vh"></Flex>
        <Flex w="60%" h="90vh" flexDir="column">
          {/* =========================== Post ======================== */}
          <Flex
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="xl"
            w="100%"
            h="max"
            mt="8"
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
                // onClick={() => upLike(commentData)}
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
                // onClick={() => downLike(commentData)}
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
          {commentData.comment.map((comment) => (
            <>
              <CommentForm comment={comment} />
            </>
          ))}
        </Flex>
        <Flex w="20%" h="90vh"></Flex>
      </Flex>
    </>
  );
}

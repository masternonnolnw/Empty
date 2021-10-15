import { IconButton } from "@chakra-ui/button";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { Box, Flex, Link, Spacer, Text } from "@chakra-ui/layout";
import moment from "moment";

export default function commentForm({ comment, postId, upLike, downLike }) {
  console.log(comment);
  // console.log(postId);
  return (
    <>
      <Flex
        borderWidth="1px"
        w="70%"
        alignSelf="center"
        borderRadius="sm"
        m="3"
        flexDir="row"
      >
        <Flex flexDir="column" alignItems="center" alignSelf="center" p="2">
          <IconButton
            variant="ghost"
            colorScheme={comment.status == 1 ? "green" : "white"}
            aria-label="Search database"
            onClick={() => upLike(comment.status, postId, comment.id)}
            isDisabled={comment.status == 99}
            icon={<ArrowUpIcon />}
            isRound
            fontSize="xl"
            _focus={{
              outline: "none",
            }}
            _active={{
              bg: "none",
            }}
          />

          <Text fontSize="md">{comment.totallike}</Text>
          <IconButton
            variant="ghost"
            colorScheme={comment.status == -1 ? "red" : "white"}
            aria-label="Search database"
            onClick={() => downLike(comment.status, postId, comment.id)}
            isDisabled={comment.status == 99}
            icon={<ArrowDownIcon />}
            isRound
            fontSize="xl"
            _focus={{
              outline: "none",
            }}
            _active={{
              bg: "none",
            }}
          />
        </Flex>
        <Flex flexDir="column" w="100%">
          <Flex flexDir="row">
            <Text alignSelf="center" mt="3">
              {moment(moment()).diff(comment.date, "minutes") == 0
                ? "Just now"
                : moment(moment()).diff(comment.date, "minutes") <= 10
                ? "posted " +
                  moment(moment()).diff(comment.date, "minutes") +
                  " minutes ago"
                : moment(comment.date).format("DD/MM/YYYY, h:mm:ss a")}
            </Text>
          </Flex>
          <Flex>
            <Text
              fontSize="xl"
              mt="3"
              ml="5"
              wordBreak="break-word"
              mr="5"
              mb="5"
            >
              {comment.body}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

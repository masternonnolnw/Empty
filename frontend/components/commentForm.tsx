import { IconButton } from "@chakra-ui/button";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { Box, Flex, Link, Text } from "@chakra-ui/layout";

export default function commentForm(comment) {
  // console.log(comment);
  return (
    <>
      <Flex
        borderWidth="1px"
        w="70%"
        alignSelf="center"
        borderRadius="sm"
        m="5"
        flexDir="row"
        alignItems="center"
      >
        <Flex
          flexDir="column"
          alignItems="center"
          alignSelf="center"
          marginRight="10"
          p="5"
        >
          <IconButton
            variant="ghost"
            colorScheme={comment.comment.status == 1 ? "green" : "white"}
            aria-label="Search database"
            // onClick={() => upLike(pos)}
            isDisabled={comment.comment.status == 99}
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

          <Text fontSize="2xl">{comment.comment.totallike}</Text>
          <IconButton
            variant="ghost"
            colorScheme={comment.comment.status == -1 ? "red" : "white"}
            aria-label="Search database"
            // onClick={() => downLike(pos)}
            isDisabled={comment.comment.status == 99}
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
        <Text>{comment.comment.body}</Text>
      </Flex>
    </>
  );
}

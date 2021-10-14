import { Box, Link, Text } from "@chakra-ui/layout";

export default function commentForm(comment) {
  console.log(comment);
  return (
    <>
      <Box borderWidth="1px" w="70%" alignSelf="center" borderRadius="sm" m="5">
        <Text>{comment.comment.body}</Text>
      </Box>
    </>
  );
}

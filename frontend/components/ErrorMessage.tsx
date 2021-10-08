import { Alert, AlertDescription, AlertIcon } from "@chakra-ui/alert";
import { Box } from "@chakra-ui/layout";

export default function ErrorMessage({ message }) {
  return (
    <Box my={4}>
      <Alert status="error" borderRadius={4}>
        <AlertIcon />
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </Box>
  );
}

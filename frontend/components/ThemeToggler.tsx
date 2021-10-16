import { IconButton } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/layout";
import { FiMoon } from "react-icons/fi";

export default function ThemeToggler() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box textAlign="right" p={4} mr={3}>
      <IconButton
        _focus={{
          outline: "none",
        }}
        _hover={{
          bg: "none",
        }}
        _active={{
          bg: "none",
        }}
        aria-label="Color Mode"
        icon={colorMode === "light" ? <FiMoon /> : <SunIcon />}
        onClick={toggleColorMode}
        variant="ghost"
      />
    </Box>
  );
}

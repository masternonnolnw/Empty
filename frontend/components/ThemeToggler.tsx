import { IconButton } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/layout";

export default function ThemeToggler() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box textAlign="right" py={4} mr={12}>
      <IconButton
        aria-label="Color Mode"
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
        variant="ghost"
      />
    </Box>
  );
}

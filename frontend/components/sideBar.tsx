import { Button, IconButton } from "@chakra-ui/button";
import { HamburgerIcon, WarningTwoIcon } from "@chakra-ui/icons";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { useState } from "react";

export default function sidebar() {
  const [navSize, setNavSize] = useState("small");
  return (
    <Box
      pos="sticky"
      left="5"
      h="50vh"
      marginTop="2.5vh"
      boxShadow="0 4px 15px 0 rgba(0, 0, 0, 0.1)"
      borderRadius={navSize == "small" ? "15px" : "30px"}
      w={navSize == "small" ? "75px" : "150px"}
      flexDir="column"
      justifyContent="space-between"
      paddingLeft={navSize == "small" ? "1" : "5"}
    >
      <Flex
        alignItems={navSize == "small" ? "center" : "flex-start"}
        flexDir="column"
      >
        <IconButton
          aria-label="Menu"
          background="none"
          mt={5}
          // _hover={{ background: "none" }}
          _focus={{ background: "none" }}
          // _active={{ background: "none" }}
          icon={<HamburgerIcon />}
          onClick={() => {
            if (navSize == "small") setNavSize("large");
            else setNavSize("small");
          }}
        />
        <Button
          background="none"
          _focus={{
            outline: "none",
          }}
          _active={{
            bg: "none",
          }}
          //   onClick={}
        >
          <WarningTwoIcon />
          {navSize == "small" ? "" : <Text marginLeft="2">Hot</Text>}
        </Button>
      </Flex>
    </Box>
  );
}

import { Button, IconButton } from "@chakra-ui/button";
import { HamburgerIcon, WarningTwoIcon } from "@chakra-ui/icons";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { useState } from "react";

export default function sidebar({
  typeLoad,
  viewType,
  isTop,
  setIsTop,
  handleSetTopViewtype,
}) {
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
        // alignItems="center"
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
          _focus={{
            outline: "none",
          }}
          _active={{
            bg: "none",
          }}
          onClick={() => typeLoad("hot")}
          w="80%"
          colorScheme={viewType == "hot" ? "teal" : "gray"}
        >
          <WarningTwoIcon />
          {navSize == "small" ? "" : <Text marginLeft="2">Hot</Text>}
        </Button>
        <Button
          _focus={{
            outline: "none",
          }}
          _active={{
            bg: "none",
          }}
          onClick={() => typeLoad("new")}
          w="80%"
          colorScheme={viewType == "new" ? "teal" : "gray"}
        >
          <WarningTwoIcon />
          {navSize == "small" ? "" : <Text marginLeft="2">New</Text>}
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
          w="80%"
        >
          <WarningTwoIcon />
          {navSize == "small" ? "" : <Text marginLeft="2">Top</Text>}
        </Button>
        {isTop ? (
          <Select
            w="max"
            onChange={handleSetTopViewtype}
            variant="outline"
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
  );
}

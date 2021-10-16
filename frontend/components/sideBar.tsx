import { Button, IconButton } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { HamburgerIcon, TimeIcon, WarningTwoIcon } from "@chakra-ui/icons";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { useState } from "react";
import { AiFillFire, AiOutlineFire } from "react-icons/ai";
import { IoTrophyOutline, IoTrophySharp } from "react-icons/io5";

export default function sidebar({
  typeLoad,
  viewType,
  isTop,
  setIsTop,
  handleSetTopViewtype,
}) {
  const [navSize, setNavSize] = useState("small");

  const bgNavbar = useColorModeValue("#F4B4C4", "red.200");
  /*
  E5B6C2
  C3A1C1
  F4B4C4
  */
  const bgContent = useColorModeValue("#E4DBDB", "red.200");
  const bgPost = useColorModeValue("#EFEFEF", "gray.200");
  const postButton = useColorModeValue("#464F64", "red.200");
  /*
  A299A0
  464F64
  */
  const activeButton = useColorModeValue("#544B52", "#759089");
  /*
  7F7573
  544B52
  70636D
  */
  const inactiveButton = useColorModeValue("", "");
  const fontButton = useColorModeValue("#FFFFFF", "#000000");

  const inFontButton = useColorModeValue("#111111", "#000000");

  const fontTagPost = useColorModeValue("#FFFFFF", "#000000");
  const tagPost = useColorModeValue("#F4B4C4", "#000000");
  return (
    <Box
      bgColor={bgPost}
      pos="sticky"
      left="5"
      h="230px"
      marginTop="2.5vh"
      boxShadow="0 4px 15px 0 rgba(0, 0, 0, 0.1)"
      borderRadius={navSize == "small" ? "15px" : "15px"}
      w={navSize == "small" ? "85px" : "150px"}
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
          bg={viewType == "hot" ? "teal" : "none"}
          _focus={{
            outline: "none",
          }}
          _active={{
            bg: "none",
          }}
          onClick={() => {
            typeLoad("hot");
            setIsTop(false);
          }}
          w="80%"
          bgColor={viewType == "hot" ? activeButton : inactiveButton}
        >
          {viewType == "hot" ? (
            <AiFillFire color={viewType == "hot" ? fontButton : inFontButton} />
          ) : (
            <AiOutlineFire
              color={viewType == "hot" ? fontButton : inFontButton}
            />
          )}
          {navSize == "small" ? (
            ""
          ) : (
            <Text
              marginLeft="2"
              color={viewType == "hot" ? fontButton : inFontButton}
            >
              Hot
            </Text>
          )}
        </Button>
        <Button
          bg={viewType == "new" ? "teal" : "none"}
          _focus={{
            outline: "none",
          }}
          _active={{
            bg: "none",
          }}
          onClick={() => {
            typeLoad("new");
            setIsTop(false);
          }}
          w="80%"
          bgColor={viewType == "new" ? activeButton : inactiveButton}
        >
          <TimeIcon color={viewType == "new" ? fontButton : inFontButton} />
          {navSize == "small" ? (
            ""
          ) : (
            <Text
              marginLeft="2"
              color={viewType == "new" ? fontButton : inFontButton}
            >
              New
            </Text>
          )}
        </Button>
        <Button
          bg={viewType.length > 4 ? "teal" : "none"}
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
          bgColor={viewType.length > 4 ? activeButton : inactiveButton}
          w="80%"
        >
          {viewType.length > 4 ? (
            <IoTrophySharp
              color={viewType.length > 4 ? fontButton : inFontButton}
            />
          ) : (
            <IoTrophyOutline
              color={viewType.length > 4 ? fontButton : inFontButton}
            />
          )}
          {navSize == "small" ? (
            ""
          ) : (
            <Text
              marginLeft="2"
              color={viewType.length > 4 ? fontButton : inFontButton}
            >
              Top
            </Text>
          )}
        </Button>
        {isTop ? (
          <Select
            size="xs"
            w="auto"
            onChange={handleSetTopViewtype}
            value={viewType.length < 4 ? "topday" : viewType}
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

import { Flex, Text, Box } from "@chakra-ui/react";
import * as React from "react";
import NavLink from "../components/NavLink";

export interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      bg={"white"}
    >
      <Flex>
        <Text fontSize={"lg"} fontWeight={"semibold"} color={"green.500"}>
          Xposed Test
        </Text>
      </Flex>

      <Box>
        <Flex align={"center"} justify={"space-between"} direction={"row"}>
          <NavLink to="/" text="Home" />
          <NavLink to="/login" text="Login" />
          <NavLink to="/form" text="Form" />
          <NavLink to="/logout" text="Logout" />
          <NavLink to="/movies" text="Movies" />
        </Flex>
      </Box>
    </Flex>
  );
};

export default Header;

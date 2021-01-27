import * as React from "react";
import { Text, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export interface NavLinkProps {
  to: string;
  text: string;
}

const NavLink: React.FunctionComponent<NavLinkProps> = ({ to, text }) => {
  return (
    <Text fontSize={"lg"} fontWeight={"semibold"} px="3" color={"green.500"}>
      <Link as={RouterLink} to={to}>
        {text}
      </Link>
    </Text>
  );
};

export default NavLink;

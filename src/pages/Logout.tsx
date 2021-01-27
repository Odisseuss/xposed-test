import * as React from "react";
import { Button, Center } from "@chakra-ui/react";
export interface LogoutProps {}

const Logout: React.FunctionComponent<LogoutProps> = () => {
  const handleLogin = () => {
    console.log("clicked");
  };
  return (
    <Center height={"500px"}>
      <Button colorScheme="teal" size="sm" onClick={handleLogin}>
        Log out
      </Button>
    </Center>
  );
};

export default Logout;

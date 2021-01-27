import { Button, Center } from "@chakra-ui/react";
import * as React from "react";

export interface LoginProps {}

const Login: React.FunctionComponent<LoginProps> = () => {
  const handleLogin = () => {
    console.log("clicked");
  };
  return (
    <Center height={"500px"}>
      <Button colorScheme="teal" size="sm" onClick={handleLogin}>
        Login
      </Button>
    </Center>
  );
};

export default Login;

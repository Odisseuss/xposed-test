import { Button, Center } from "@chakra-ui/react";
import * as React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logIn } from "../store/slices/auth";

export interface LoginProps {}

const Login: React.FunctionComponent<LoginProps> = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleLogin = () => {
    localStorage.setItem("is_logged_in", "true");
    history.replace("/form");
    dispatch(logIn());
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

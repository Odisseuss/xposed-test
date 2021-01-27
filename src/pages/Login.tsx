import { Button, Center } from "@chakra-ui/react";
import * as React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logIn } from "../store/slices/auth";

export interface LoginProps {
  setUserLoggedIn: () => void;
}

const Login: React.FunctionComponent<LoginProps> = ({ setUserLoggedIn }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogin = () => {
    setUserLoggedIn();
    dispatch(logIn());
    history.replace("/form");
  };
  return (
    <Center height={"500px"}>
      <Button colorScheme="green" size="sm" onClick={handleLogin}>
        Login
      </Button>
    </Center>
  );
};

export default Login;

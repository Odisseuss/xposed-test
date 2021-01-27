import * as React from "react";
import { Button, Center } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../store/slices/auth";

export interface LogoutProps {
  setUserLoggedIn: () => void;
}

const Logout: React.FunctionComponent<LogoutProps> = ({ setUserLoggedIn }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogin = () => {
    localStorage.setItem("is_logged_in", "false");
    setUserLoggedIn();
    dispatch(logOut());
    history.replace("/");
  };

  return (
    <Center height={"500px"}>
      <Button colorScheme="green" size="sm" onClick={handleLogin}>
        Log out
      </Button>
    </Center>
  );
};

export default Logout;

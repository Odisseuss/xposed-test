import React, { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Home from "./pages/Home";
import { ChakraProvider } from "@chakra-ui/react";
import Login from "./pages/Login";
import Header from "./components/Header";
import Form from "./pages/Form";
import Logout from "./pages/Logout";
import { useDispatch } from "react-redux";
import { logOut, logIn } from "./store/slices/auth";
import Movies from "./pages/Movies";

function App() {
  const dispatch = useDispatch();
  // Set logged in state for conditionally rendering pages
  const [isLogged, setIsLogged] = useState(
    localStorage.getItem("is_logged_in")
  );
  // If local storage value was changed from outside
  // Dispatch corresponding auth action
  // and update local state
  const checkForLocalStorageChange = React.useCallback(
    (event) => {
      if (event.key === "is_logged_in")
        if (event.newValue === "false") {
          setIsLogged("false");
          dispatch(logOut());
        } else if (event.newValue === "true") {
          setIsLogged("true");
          dispatch(logIn());
        }
    },
    [dispatch]
  );
  // Subscribe to local storage events with given handler
  React.useEffect(() => {
    window.addEventListener("storage", checkForLocalStorageChange);

    return () => {
      window.removeEventListener("storage", checkForLocalStorageChange);
    };
  }, [checkForLocalStorageChange]);
  // App Router
  return (
    <ChakraProvider>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/movies">
            <Movies />
          </Route>
          <Route exact path="/login">
            <Login setUserLoggedIn={() => setIsLogged("true")} />
          </Route>
          <Route exact path="/form">
            {isLogged === "true" ? <Form /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/logout">
            <Logout setUserLoggedIn={() => setIsLogged("false")} />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;

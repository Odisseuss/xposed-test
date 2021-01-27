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
import { setRecords } from "./store/slices/records";
import { getRecordsFromApi } from "./utils/getRecordsFromStorage";
import { getAuthFromApi } from "./utils/getAuthFromApi";

function App() {
  const dispatch = useDispatch();
  // Set logged in state for conditionally rendering pages
  const [isLogged, setIsLogged] = useState("false");
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
    getAuthFromApi().then((apiAuthRes) => {
      if (apiAuthRes) {
        setIsLogged(apiAuthRes);
        apiAuthRes === true ? dispatch(logIn()) : dispatch(logOut());
      }
    });
    getRecordsFromApi().then((apiRecordsRes) => {
      if (apiRecordsRes) dispatch(setRecords(apiRecordsRes));
    });
  }, [checkForLocalStorageChange, dispatch]);
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

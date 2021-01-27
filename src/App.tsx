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

function App() {
  const [isLogged, setIsLogged] = useState(
    localStorage.getItem("is_logged_in")
  );
  return (
    <ChakraProvider>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/login">
            <Login setUserLoggedIn={() => setIsLogged("true")} />
          </Route>
          <Route exact path="/form">
            {isLogged === "false" ? <Redirect to="/login" /> : <Form />}
          </Route>
          <Route exact path="/logout">
            <Logout setUserLoggedIn={() => setIsLogged("true")} />
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

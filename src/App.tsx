import React from "react";
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
  return (
    <ChakraProvider>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/form">
            {localStorage.getItem("is_logged_in") === "true" ? (
              <Form />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route exact path="/logout">
            <Logout />
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

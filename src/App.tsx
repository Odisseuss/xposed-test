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
import { getRecordsFromApi } from "./utils/getRecordsFromApi";
import { getAuthFromApi } from "./utils/getAuthFromApi";

// Nu am mai avut timp sa implementez si functionalitatea de autorizare pe baza de JWT, dar asa as fi procedat:
// As fi creat un endpoint in API care sa asculte pentru POST request-uri, iar atunci cand primeste unul sa creeze un JWT,
// si un secret, si sa il atribuie unui User in baza de date (in cazul in care ar exista colectia asta).
// Cand userul apasa pe butonul de login, se face un post request catre acest endpoint care va returna JWT-ul
// As pastra JWT in cookies pe partea de frontend.
// Cand userul doreste sa acceseze /form, as trimite JWT-ul din cookies catre un alt endpoint care se va ocupa cu verificare validitatii JWT-ului
// In cazul in care JWT este valid, atunci se va trece la urmatorul pas. Daca nu e valid, se va returna un status de 403 Forbidden si un mesaj de eroare

function App() {
  const dispatch = useDispatch();
  // Set logged in state for conditionally rendering pages
  const [isLogged, setIsLogged] = useState("false");

  // Perform requests for data
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
  }, [dispatch]);
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

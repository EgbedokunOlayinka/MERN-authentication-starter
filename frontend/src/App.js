import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ChatPage from "./pages/ChatPage";

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={ChatPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/register" component={RegisterPage} />
    </Switch>
  );
};

export default App;

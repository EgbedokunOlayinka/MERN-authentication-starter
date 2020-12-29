import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { theme } from "./theme";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Provider store={store}>
    <ChakraProvider theme={theme} resetCSS={true}>
      <Router>
        <App />
      </Router>
    </ChakraProvider>
  </Provider>,
  document.getElementById("root")
);

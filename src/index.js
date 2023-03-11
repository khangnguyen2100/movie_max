import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App";
import chakraConfig from "src/utils/chakraConfig"
import store from "src/redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ChakraProvider resetCSS={true} theme={chakraConfig}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </Provider>
);

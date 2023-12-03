import { ThemeProvider } from "@mui/material";
import FullScreenContainer from "app/components/layout";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PositivoTheme from "theme";
import App from "./app/app";
import store from "./core/redux/store";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={PositivoTheme}>
      <Provider store={store}>
        <ToastContainer />
        <BrowserRouter>
          <FullScreenContainer>
            <App />
          </FullScreenContainer>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

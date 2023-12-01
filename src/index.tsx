import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./core/redux/store";
import App from "./app/app";
import { BrowserRouter } from "react-router-dom";
import FullScreenContainer from "app/components/layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ToastContainer />
    <BrowserRouter>
      <FullScreenContainer>
        <App />
      </FullScreenContainer>
    </BrowserRouter>
  </Provider>
);

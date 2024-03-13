import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import ErrorBoundaryLayout from "layout/ErrorBoundary";
import store from "store/reducer";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "assets/scss/index.scss";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ErrorBoundaryLayout>
        <App />
      </ErrorBoundaryLayout>
    </BrowserRouter>
    {/* <Fallback /> */}
  </Provider>,
);

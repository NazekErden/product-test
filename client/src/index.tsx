import React from "react";
import { createRoot } from "react-dom/client"; // Импортируем createRoot
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/store";

const container = document.getElementById("root");
const root = createRoot(container!); // Создаем root элемент

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);

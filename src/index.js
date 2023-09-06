import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { ContextMenuProvider } from "./context/OpenMenuContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <ContextMenuProvider>
      <App />
    </ContextMenuProvider>
  </AuthContextProvider>
);

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { initializeTheme, ThemeProvider } from "./context/ThemeContext";

import "./index.css";

const rootElement = document.getElementById("root");
const initialTheme = initializeTheme();

if (rootElement) {
  document.documentElement.classList.toggle("dark", initialTheme === "dark");
  document.documentElement.style.colorScheme = initialTheme;
}

ReactDOM.createRoot(rootElement).render(
  <BrowserRouter>
    <ThemeProvider initialTheme={initialTheme}>
      <AuthProvider>
        <Toaster position="top-right" />
        <App />
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);
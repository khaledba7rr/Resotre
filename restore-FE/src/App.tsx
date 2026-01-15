import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import "./App.css";

import Navbar from "./app/components/navbar/Navbar";
import ProductList from "./app/components/product-list/ProductList";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import About from "./app/components/about/About";
import ProductDetails from "./app/components/product-details/ProductDetails";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const currentTheme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
      background: { default: isDarkMode ? "#121212" : "#ffffff" },
      primary: {
        main: isDarkMode ? "#90caf9" : "#063F88",
      },
      secondary: {
        main: isDarkMode ? "#f48fb1" : "#3D82DA",
      },
    },
  });

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Navbar toggleDarkMode={toggleDarkMode} />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/about" element={<About />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;

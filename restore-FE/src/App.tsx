import { CssBaseline, ThemeProvider } from "@mui/material";
import "./App.css";

import Navbar from "./app/components/navbar/Navbar";
import ProductList from "./app/components/product-list/ProductList";
import { Route, Routes } from "react-router-dom";
import About from "./app/components/about/About";
import ProductDetails from "./app/components/product-details/ProductDetails";
import { useAppSelector } from "./app/store/store";
import Spinner from "./app/components/spinner/Spinner";
import { getThemePreferences } from "./app/components/constants";

function App() {
  const isLoading = useAppSelector((state) => state.ui.isLoading);
  const isDarkMode = useAppSelector((state) => state.ui.darkMode);

  return (
    <ThemeProvider theme={getThemePreferences(isDarkMode)}>
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/about" element={<About />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
      {isLoading && <Spinner />}
    </ThemeProvider>
  );
}

export default App;

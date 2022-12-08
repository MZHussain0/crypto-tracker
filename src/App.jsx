import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import CoinsPage from "./Pages/CoinsPage/CoinsPage";
import HomePage from "./Pages/HomePage/HomePage";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/coins/:id" element={<CoinsPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

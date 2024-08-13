import { BrowserRouter, Route, Routes } from "react-router-dom";
import ThemeProvider from "./theme";
import LoginPage from "./pages/auth/login/login";
import RegisterPage from "./pages/auth/register/register";
import HomePage from "./pages/private/home/home";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

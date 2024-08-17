import { BrowserRouter, Route, Routes } from "react-router-dom";
import ThemeProvider from "./theme";
import LoginPage from "./pages/auth/login/login";
import RegisterPage from "./pages/auth/register/register";
import HomePage from "./pages/private/home/home";
import ProfilePage from "./pages/private/profile/profile";
import PublicLayout from "./layout/public-layout";
import PrivateLayout from "./layout/private-layout";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicLayout>
                <LoginPage />
              </PublicLayout>
            }
          />
          <Route
            path="/register"
            element={
              <PublicLayout>
                <RegisterPage />
              </PublicLayout>
            }
          />
          <Route
            path="/"
            element={
              <PrivateLayout>
                <HomePage />
              </PrivateLayout>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateLayout>
                <ProfilePage />
              </PrivateLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

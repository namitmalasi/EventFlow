import { BrowserRouter, Route, Routes } from "react-router-dom";
import ThemeProvider from "./theme";
import LoginPage from "./pages/auth/login/login";
import RegisterPage from "./pages/auth/register/register";
import HomePage from "./pages/private/home/home";
import ProfilePage from "./pages/private/profile/profile";
import PublicLayout from "./layout/public-layout";
import PrivateLayout from "./layout/private-layout";
import EventsPage from "./pages/private/admin/events/EventsPage";
import CreateEventPage from "./pages/private/admin/events/create/createEventPage";
import EditEventPage from "./pages/private/admin/events/edit/editEventPage";
import EventInfoPage from "./pages/private/event/event-info-page";
import UserBookingspage from "./pages/private/profile/bookings/user-bookings-page";
import AdminBookings from "./pages/private/admin/bookings/admin-bookings";
import AdminUsers from "./pages/private/admin/users/admin-users";

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
            path="/event/:id"
            element={
              <PrivateLayout>
                <EventInfoPage />
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

          <Route
            path="/profile/bookings"
            element={
              <PrivateLayout>
                <UserBookingspage />
              </PrivateLayout>
            }
          />

          <Route
            path="/admin/events"
            element={
              <PrivateLayout>
                <EventsPage />
              </PrivateLayout>
            }
          />
          <Route
            path="/admin/events/create"
            element={
              <PrivateLayout>
                <CreateEventPage />
              </PrivateLayout>
            }
          />
          <Route
            path="/admin/events/edit/:id"
            element={
              <PrivateLayout>
                <EditEventPage />
              </PrivateLayout>
            }
          />
          <Route
            path="/admin/bookings"
            element={
              <PrivateLayout>
                <AdminBookings />
              </PrivateLayout>
            }
          />
          <Route
            path="/admin/users"
            element={
              <PrivateLayout>
                <AdminUsers />
              </PrivateLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

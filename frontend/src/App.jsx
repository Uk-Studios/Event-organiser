import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";

import HomeScreen from "./screens/HomeScreen";
import AlbumsScreen from "./screens/AlbumsScreen";
import AlbumDetailsScreen from "./screens/AlbumDetailsScreen";
import ContactScreen from "./screens/ContactScreen";

import AdminLoginScreen from "./screens/AdminLoginScreen";
import AdminDashboardScreen from "./screens/AdminDashboardScreen";
import AdminAlbumsScreen from "./screens/AdminAlbumsScreen";
import AdminEnquiriesScreen from "./screens/AdminEnquiriesScreen";
import AdminGalleryScreen from "./screens/AdminGalleryScreen";

import AdminRoute from "./components/AdminRoute";

import CategoryAlbumsScreen from "./screens/CategoryAlbumsScreen";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* PUBLIC ROUTES */}

        <Route element={<PublicLayout />}>

          <Route
            path="/"
            element={<HomeScreen />}
          />

          <Route
            path="/albums"
            element={<AlbumsScreen />}
          />

          <Route
            path="/albums/category/:category"
            element={<CategoryAlbumsScreen />}
          />

          <Route
            path="/albums/:id"
            element={<AlbumDetailsScreen />}
          />

          <Route
            path="/contact"
            element={<ContactScreen />}
          />

        </Route>

        {/* ADMIN LOGIN */}

        <Route
          path="/admin/login"
          element={<AdminLoginScreen />}
        />

        {/* PROTECTED ADMIN */}

        <Route element={<AdminRoute />}>

          <Route element={<AdminLayout />}>

            <Route
              path="/admin/dashboard"
              element={<AdminDashboardScreen />}
            />

            <Route
              path="/admin/albums"
              element={<AdminAlbumsScreen />}
            />

            <Route
              path="/admin/gallery"
              element={<AdminGalleryScreen />}
            />

            <Route
              path="/admin/enquiries"
              element={<AdminEnquiriesScreen />}
            />

          </Route>

        </Route>

      </Routes>

    </BrowserRouter>

  );
}

export default App;

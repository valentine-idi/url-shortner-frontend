import { Routes, Route } from "react-router";
import AuthProvider from "./components/AuthProvider";
import GuestRoute from "./components/GuestRoute";
import Home from "./pages/home";
import Login from "./pages/login";
import styles from "./App.module.scss";
import NavBar from "./components/navbar";
import Signup from "./pages/signup";
import MyLinks from "./pages/myLinks";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/notFound";

function App() {
  return (
    <AuthProvider>
      <NavBar />
      <div className={styles.container}>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/links" element={<MyLinks />} />
          </Route>

          <Route element={<GuestRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;

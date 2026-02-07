import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

export default function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null; // 🔥 VERY IMPORTANT FOR CYPRESS

  return (
    <Routes>
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/" />}
      />
      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate to="/" />}
      />
      <Route
        path="/"
        element={user ? <Home /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

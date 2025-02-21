import './App.css';
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage.tsx";
import Dashboard from "./components/Dashboard/Dashboard.tsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.tsx";
import ModifyUserPage from "./components/Pages/ModifyUserPage.tsx";
import ModifyRolePage from "./components/Pages/ModifyRolePage.tsx";

function App() {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>} />
        <Route path="/create-user" element={<ModifyUserPage />} />
        <Route path="/create-role" element={<ModifyRolePage />} />


        <Route path="/edit-user/:id" element={<ModifyUserPage />} />
      </Routes>
    </Router>
  );
}

export default App;

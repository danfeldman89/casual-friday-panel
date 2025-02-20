import './App.css';
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage.tsx";
import Dashboard from "./components/Dashboard/Dashboard.tsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.tsx";

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
      </Routes>
    </Router>
  );
}

export default App;

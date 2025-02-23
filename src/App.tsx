import './App.css';
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage.tsx";
import Dashboard from "./components/Dashboard/Dashboard.tsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.tsx";
import ModifyUserPage from "./components/Pages/ModifyUserPage.tsx";
import ModifyRolePage from "./components/Pages/ModifyRolePage.tsx";
import TabPanel from "./components/TabPanel/TabPanel.tsx";
import { RootState } from "./store/store.ts";
import { useSelector } from "react-redux";
import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import BoostersTable from "./components/Boosters/BoostersTable.tsx";
import ModifyBoosterPage from "./components/Pages/ModifyBoosterPage.tsx";

function App() {
  const currentUser = useSelector((state: RootState) => state.users.currentUser);
  const handleChange = (_: React.SyntheticEvent, newValue: number) => setValue(newValue);
  const [value, setValue] = useState(currentUser?.roles.find(role => role === 'Admin') !== undefined ? 0 : 1);

  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={
          <Box sx={{ display: "flex", flexDirection: "column"/*, height: "100%"*/ }}>
            <Tabs value={value} onChange={handleChange} aria-label="Tab Panel Example">
              <Tab label="Admin panel" />
              <Tab label="Boosters management" />
            </Tabs>

            {currentUser &&
                <TabPanel value={value} index={0}>
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                </TabPanel>}

            <TabPanel value={value} index={1}>
              <ProtectedRoute>
                <BoostersTable />
              </ProtectedRoute>
            </TabPanel>
          </Box>
        } />
        <Route path="/create-user" element={<ModifyUserPage />} />
        <Route path="/create-role" element={<ModifyRolePage />} />
        <Route path="/create-booster" element={<ModifyBoosterPage />} />


        <Route path="/edit-user/:id" element={<ModifyUserPage />} />
        <Route path="/edit-role/:id" element={<ModifyRolePage />} />
        <Route path="/edit-booster/:id" element={<ModifyBoosterPage />} />
      </Routes>
    </Router>
  );
}

export default App;

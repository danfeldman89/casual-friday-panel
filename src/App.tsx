import './App.css';
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage.tsx";
import Dashboard from "./components/Dashboard/Dashboard.tsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.tsx";
import ModifyUserPage from "./components/Pages/ModifyUserPage.tsx";
import ModifyRolePage from "./components/Pages/ModifyRolePage.tsx";
import TabPanel from "./components/TabPanel/TabPanel.tsx";
import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import BoostersTable from "./components/Boosters/BoostersTable.tsx";
import ModifyBoosterPage from "./components/Pages/ModifyBoosterPage.tsx";
import ModifyPermissionPage from "./components/Pages/ModifyPermissionPage.tsx";
import { isAdmin } from "./types/types.tsx";
import { useCurrentUser } from "./hooks/useCurrentUser.ts";

function App() {
  const currentUser = useCurrentUser();
  const isAdminUser = isAdmin(currentUser);

  const tabConfig = [
    ...(isAdminUser ? [{ label: "Admin panel", index: 0 }] : []),
    { label: "Boosters management", index: isAdminUser ? 1 : 0 }
  ];

  const [value, setValue] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => setValue(newValue);

  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={
          <Box sx={{ display: "flex", flexDirection: "column", height: "98%", padding:"0px" }}>
            <Tabs value={value} onChange={handleChange} aria-label="Conditional Tabs Example">
              {tabConfig.map((tab) => (
                <Tab key={tab.index} label={tab.label} sx={{ outline: "none", "&:focus": { outline: "none" } }} />
              ))}
            </Tabs>

            {isAdminUser && (
              <TabPanel value={value} index={0}>
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              </TabPanel>
            )}

            <TabPanel value={value} index={isAdminUser ? 1 : 0}>
              <ProtectedRoute>
                <BoostersTable />
              </ProtectedRoute>
            </TabPanel>
          </Box>
        } />
        <Route path="/create-user" element={<ModifyUserPage />} />
        <Route path="/create-role" element={<ModifyRolePage />} />
        <Route path="/create-permission" element={<ModifyPermissionPage />} />
        <Route path="/create-booster" element={<ModifyBoosterPage />} />
        <Route path="/edit-user/:id" element={<ModifyUserPage />} />
        <Route path="/edit-role/:id" element={<ModifyRolePage />} />
        <Route path="/edit-permission/:id" element={<ModifyPermissionPage />} />
        <Route path="/edit-booster/:id" element={<ModifyBoosterPage />} />
      </Routes>
    </Router>
  );
}

export default App;

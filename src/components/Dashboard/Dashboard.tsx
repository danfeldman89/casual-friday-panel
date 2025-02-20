import React, { useEffect, useState } from "react";
import { Alert, Badge, Box, Button, CircularProgress, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Toolbar, Tooltip, Typography } from "@mui/material";
import { User } from "../../types/types";
import { Add } from "@mui/icons-material";
import TabPanel from "../TabPanel/TabPanel.tsx";

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("Authorization token is missing. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:200/api/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch users.");
        }

        const data: User[] = await response.json();
        setUsers(data); // Update users state with the fetched data
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ height: "100%" }}>
      <Paper elevation={3} sx={{ height: "100%" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" component="div">
            Admin panel
          </Typography>
        </Toolbar>

        <Tabs value={selectedTab}
              sx={{ margin: "0 2rem" }}
              onChange={(_, num) => setSelectedTab(num)}>
          <Tab label="Users" sx={{ outline: "none", "&:focus": { outline: "none" } }} />
          <Tab label="Roles" sx={{ outline: "none", "&:focus": { outline: "none" } }} />
          <Tab label="Permissions" sx={{ outline: "none", "&:focus": { outline: "none" } }} />
        </Tabs>
        <TabPanel value={selectedTab} index={0}>
          <TableContainer>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button startIcon={<Add />} />
            </Box>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell align="center">Active</TableCell>
                  <TableCell align="center">Roles</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => <TableRow key={user.id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell align="center">{user.isActive ? "Yes" : "No"}</TableCell>

                  <TableCell align="center">
                    <Tooltip
                      title={
                        <Box>
                          <div>User Roles:</div>
                          <ul>{user.roleIds.map((role: string) => <li key={role}>{role}</li>)}</ul>
                        </Box>
                      }>

                      <Badge
                        badgeContent={user.roleIds.length}
                        sx={{
                          "& .MuiBadge-badge": {
                            backgroundColor: "#4caf50",
                            cursor: "pointer",
                            userSelect: "none",
                            color: "white",
                            borderRadius: "4px",
                            fontSize: "0.75rem"
                          }
                        }}
                      />
                    </Tooltip>
                  </TableCell>
                </TableRow>)}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={selectedTab} index={1}>
          <TableContainer>
            {/* Another table content goes here */}
          </TableContainer>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default Dashboard;

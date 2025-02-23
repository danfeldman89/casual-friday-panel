import React, { useEffect, useState } from "react";
import { Alert, Box, CircularProgress, Paper, Tab, Tabs } from "@mui/material";
import { isPermitted, Permission, Role, User } from "../../types/types";
import TabPanel from "../TabPanel/TabPanel.tsx";
import UsersTable from "./Tables/UsersTable.tsx";
import { getUsersApi } from "../../api/user.ts";
import { getRolesApi } from "../../api/roles.ts";
import { useDispatch, useSelector } from "react-redux";
import { updateUsers } from "../../store/userSlice.ts";
import { RootState } from "../../store/store.ts";
import { updateRoles } from "../../store/roleSlice.ts";
import RolesTable from "./Tables/RolesTable.tsx";
import { getPermissionsApi } from "../../api/permissions.ts";
import { updatePermissions } from "../../store/permissionSlice.ts";
import PermissionsTable from "./Tables/PermissionsTable.tsx";

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  const dispatch = useDispatch();

  const current = useSelector((state: RootState) => state.users.currentUser);
  const users = useSelector((state: RootState) => state.users.usersCollection);
  const roles = useSelector((state: RootState) => state.roles.rolesCollection);
  const permissions = useSelector((state: RootState) => state.permissions.permissionsCollection);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("Authorization token is missing. Please log in.");
      setLoading(false);
      return;
    }

    getUsersApi()
      .then((response) => response.json())
      .then((users: User[]) => dispatch(updateUsers(users)))
      .catch((err: any) => setError(err.message))
      .finally(() => setLoading(false));

    getRolesApi()
      .then((response) => response.json())
      .then((roles: Role[]) => dispatch(updateRoles(roles)))
      .catch((err: any) => setError(err.message))
      .finally(() => setLoading(false));

    getPermissionsApi()
      .then((response) => response.json())
      .then((permissions: Permission[]) => dispatch(updatePermissions(permissions)))
      .catch((err: any) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Box display="flex"
           justifyContent="center"
           alignItems="center"
           height="100vh">
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
        <Tabs value={selectedTab}
              sx={{ margin: "0 2rem" }}
              onChange={(_, num) => setSelectedTab(num)}>
          {isPermitted(current, 'Users', 'Read') && <Tab label="Users" sx={{ outline: "none", "&:focus": { outline: "none" } }} />}
          {isPermitted(current, 'Roles', 'Read') && <Tab label="Roles" sx={{ outline: "none", "&:focus": { outline: "none" } }} />}
          {isPermitted(current, 'Permissions', 'Read') && <Tab label="Permissions" sx={{ outline: "none", "&:focus": { outline: "none" } }} />}
        </Tabs>
        <TabPanel value={selectedTab} index={0}>
          <UsersTable users={users} />
        </TabPanel>

        <TabPanel value={selectedTab} index={1}>
          <RolesTable roles={roles} />
        </TabPanel>

        <TabPanel value={selectedTab} index={2}>
          <PermissionsTable permissions={permissions} />
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default Dashboard;

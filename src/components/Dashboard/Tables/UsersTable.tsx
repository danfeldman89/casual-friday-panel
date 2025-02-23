import { Badge, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import { Add } from "@mui/icons-material";
import { isPermitted, Role, User } from "../../../types/types.tsx";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../../store/userSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserApi } from "../../../api/user.ts";
import { useCurrentUser } from "../../../hooks/useCurrentUser.ts";
import { RootState } from "../../../store/store.ts";

interface UsersTableProps {
  users: User[];
}

function UsersTable({ users }: UsersTableProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const current = useCurrentUser();
  const roles = useSelector((state: RootState) => state.roles.rolesCollection);

  function getUserRoles(user: User) {
    const userRoles: Role[] = [];

    user.roleIds.forEach((roleId) => {
      const role = roles.find((role) => role.id === roleId);
      if (role) {
        userRoles.push(role);
      }
    });

    return userRoles;
  }

  return (
    <TableContainer>
      <Box sx={{ display: "flex", gap: 1, padding: "0 2rem" }}>
        <Button startIcon={<Add />}
                variant="contained"
                color="primary"
                onClick={() => navigate('/create-user')}>
          Add user
        </Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell align="center">Active</TableCell>
            <TableCell align="center">Roles</TableCell>
            <TableCell align="center"></TableCell>
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
                    <ul>{getUserRoles(user).map(value => (
                      <li>
                        {value.name}
                      </li>))}</ul>
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
            {isPermitted(current, 'Users', 'Write') &&
                <TableCell align="center">
                    <Button variant="outlined"
                            size="small"
                            sx={{ margin: "0 0.5rem" }}
                            onClick={() => navigate(`/edit-user/${user.id}`)}>
                        Edit
                    </Button>
                    <Button variant="outlined"
                            size="small"
                            sx={{ margin: "0 0.5rem" }}
                            onClick={() => {
                              dispatch(deleteUser(user.id));
                              deleteUserApi(user.id);
                            }}>
                        Delete
                    </Button>
                </TableCell>}
          </TableRow>)}
        </TableBody>
      </Table>
    </TableContainer>);
}

export default UsersTable;

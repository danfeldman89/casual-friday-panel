import { Badge, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import { Add } from "@mui/icons-material";
import { User } from "../../../types/types.tsx";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../../store/userSlice.ts";
import { useDispatch } from "react-redux";
import { deleteUserApi } from "../../../api/user.ts";

interface UsersTableProps {
  users: User[];
}

function UsersTable({ users }: UsersTableProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <TableContainer>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button startIcon={<Add />} onClick={() => navigate('/create-user')} />
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
            </TableCell>
          </TableRow>)}
        </TableBody>
      </Table>
    </TableContainer>);
}

export default UsersTable;

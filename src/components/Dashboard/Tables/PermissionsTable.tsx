import { Badge, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Permission } from "../../../types/types.tsx";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deletePermission } from "../../../store/permissionSlice.ts";
import { deletePermissionApi } from "../../../api/permissions.ts";

interface PermissionsTableProps {
  permissions: Permission[];
}

function PermissionsTable({ permissions }: PermissionsTableProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <TableContainer>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button startIcon={<Add />} onClick={() => navigate("/create-permission")} />
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Permission Name</TableCell>
            <TableCell>Resource</TableCell>
            <TableCell align="center">Operations</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {permissions.map((permission) => (
            <TableRow key={permission.id}>
              <TableCell>{permission.name}</TableCell>
              <TableCell>{permission.resource}</TableCell>
              <TableCell align="center">
                <Badge badgeContent={`${permission.canRead ? "R" : ""}${permission.canWrite ? "W" : ""}`}
                       sx={{
                         "& .MuiBadge-badge": {
                           backgroundColor: "#4caf50",
                           cursor: "pointer",
                           userSelect: "none",
                           color: "white",
                           borderRadius: "4px",
                           fontSize: "0.75rem"
                         }
                       }} />
              </TableCell>
              <TableCell align="center">
                <Button variant="outlined"
                        size="small"
                        sx={{ margin: "0 0.5rem" }}
                        onClick={() => navigate(`/edit-permission/${permission.id}`)}
                >
                  Edit
                </Button>
                <Button variant="outlined"
                        size="small"
                        sx={{ margin: "0 0.5rem" }}
                        onClick={() => {
                          dispatch(deletePermission(permission.id));
                          deletePermissionApi(permission.id);
                        }}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PermissionsTable;

import { Badge, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Permission, Role } from "../../../types/types.tsx";
import { useNavigate } from "react-router-dom";

interface RolesTableProps {
  roles: Role[];
}

function RolesTable({ roles }: RolesTableProps) {
  const navigate = useNavigate();

  return (
    <TableContainer>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button startIcon={<Add />} onClick={() => navigate('/create-role')} />
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Rolename</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="center">Permissions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roles.map((role) => <TableRow key={role.id}>
            <TableCell>{role.name}</TableCell>
            <TableCell>{role.description}</TableCell>

            <TableCell align="center">
              <Tooltip
                title={
                  <Box>
                    <div>User Permissions:</div>
                    <ul>{role.permissions.map((permission: Permission) => <li key={permission.id}>{permission.name}</li>)}</ul>
                  </Box>}>

                <Badge
                  badgeContent={role.permissions.length}
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "#f28c82",
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
    </TableContainer>);
}

export default RolesTable;

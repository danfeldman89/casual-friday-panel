import { Badge, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import { Add } from "@mui/icons-material";
import { isPermitted, Permission, Role } from "../../../types/types.tsx";
import { useNavigate } from "react-router-dom";
import { deleteRole } from "../../../store/roleSlice.ts";
import { deleteRoleApi } from "../../../api/roles.ts";
import { useDispatch } from "react-redux";
import { useCurrentUser } from "../../../hooks/useCurrentUser.ts";

interface RolesTableProps {
  roles: Role[];
}

function RolesTable({ roles }: RolesTableProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const current = useCurrentUser();

  return (
    <TableContainer>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button startIcon={<Add />}
                variant="contained"
                color="primary"
                onClick={() => navigate('/create-role')}>
          Add role
        </Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Rolename</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="center">Permissions</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roles.map((role) =>
                       <TableRow key={role.id}>
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
                         {isPermitted(current, 'Roles', 'Write') &&
                             <TableCell align="center">
                                 <Button variant="outlined"
                                         size="small"
                                         sx={{ margin: "0 0.5rem" }}
                                         onClick={() => navigate(`/edit-role/${role.id}`)}>
                                     Edit
                                 </Button>
                                 <Button variant="outlined"
                                         size="small"
                                         sx={{ margin: "0 0.5rem" }}
                                         onClick={() => {
                                           dispatch(deleteRole(role.id!));
                                           deleteRoleApi(role.id!);
                                         }}>
                                     Delete
                                 </Button>
                             </TableCell>}
                       </TableRow>)}
        </TableBody>
      </Table>
    </TableContainer>);
}

export default RolesTable;

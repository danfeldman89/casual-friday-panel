import React, { useEffect, useState } from "react";
import { Box, Button, Checkbox, FormControlLabel, FormGroup, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate, useParams } from "react-router-dom";
import { Close } from "@mui/icons-material";
import { createRoleApi, updateRoleApi } from "../../api/roles";
import { Permission, Role } from "../../types/types";

function ModifyRolePage() {
  const navigate = useNavigate();
  const permissions = useSelector((state: RootState) => state.permissions.permissionsCollection);
  const roles = useSelector((state: RootState) => state.roles.rolesCollection);

  const { id } = useParams<{ id: string }>();

  const [formRole, setFormRole] = useState({
                                             name: "",
                                             description: "",
                                             permissions: [] as Permission[]
                                           });

  useEffect(() => {
    if (id) {
      const searchedUser = roles.find((r: Role) => r.id === id);
      if (searchedUser) setFormRole(searchedUser);
    }
  }, [id, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormRole((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePermissionSelection = (permission: Permission) => {
    setFormRole((prev) => {
      const isSelected = prev.permissions.some((p) => p.id === permission.id);
      const updatedPermissions = isSelected
                                 ? prev.permissions.filter((p) => p.id !== permission.id)
                                 : [...prev.permissions, permission];

      return { ...prev, permissions: updatedPermissions };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (id) {
      updateRoleApi(id, formRole)
        .then((response) => {
          if (response.ok) {
            alert("Role updated successfully!");
            navigate("/dashboard");
          } else {
            return response.json().then((error) => {
              alert(`Failed to update role: ${error.message}`);
            });
          }
        })
        .catch((error) => {
          alert(`An unexpected error occurred while updating the role: ${error}`);
        });
    } else {
      createRoleApi(formRole)
        .then((response) => {
          if (response.ok) {
            alert("Role created successfully!");
            navigate("/dashboard");
          } else {
            return response.json().then((error) => {
              alert(`Failed to create role: ${error.message}`);
            });
          }
        })
        .catch((error) => {
          alert(`An unexpected error occurred while creating the role: ${error}`);
        });
    }
  };

  return (
    <Box sx={{
      maxWidth: 600,
      margin: "auto",
      mt: 4,
      p: 3,
      boxShadow: 3,
      borderRadius: 2,
      display: "flex",
      flexDirection: "column"
    }}>
      <Typography variant="h4"
                  sx={{
                    textAlign: "center",
                    mb: 3,
                    color: "var(--app-font-color)",
                    position: "relative"
                  }}>
        {id ? "Edit Role" : "Create New Role"}
        <Button sx={{ position: "absolute", top: 0, right: 0 }} onClick={() => navigate(-1)}>
          <Close />
        </Button>
      </Typography>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <TextField fullWidth
                   label="Role Name"
                   name="name"
                   value={formRole.name}
                   onChange={handleChange}
                   margin="normal"
                   required />
        <TextField fullWidth
                   label="Description"
                   name="description"
                   value={formRole.description}
                   onChange={handleChange}
                   margin="normal"
                   multiline
                   rows={3}
                   required />
        <FormGroup sx={{ mt: 2 }}>
          {permissions.map((permission) => (
            <FormControlLabel
              key={permission.id}
              control={
                <Checkbox
                  checked={formRole.permissions.some((p) => p.id === permission.id)}
                  onChange={() => handlePermissionSelection(permission)} />
              }
              label={permission.name}
            />
          ))}
        </FormGroup>
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>
    </Box>
  );
}

export default ModifyRolePage;

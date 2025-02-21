import React, { useState } from "react";
import { Box, Button, Checkbox, FormControlLabel, FormGroup, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store.ts";
import { useNavigate } from "react-router-dom";
import { Close } from "@mui/icons-material";
import { createRole } from "../../api/roles.ts";
import { Permission } from "../../types/types.tsx";

function ModifyRolePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const permissions = useSelector((state: RootState) => state.permissions.permissionsCollection);

  const [formRole, setFormRole] = useState({
                                             name: "",
                                             description: "",
                                             permissions: [] as Permission[]
                                           });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormRole((prev) => ({ ...prev, [name]: value }));
  };

  const handlePermissionSelection = (permission: Permission) => {
    setFormRole((prev) => {
      const isSelected = prev.permissions.some((prevPermission) => prevPermission.id === permission.id);
      const updatedPermissions = isSelected
                                 ? prev.permissions.filter((prevPermission) => prevPermission.id !== permission.id)
                                 : [...prev.permissions, permission];
      return { ...prev, permissions: updatedPermissions };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createRole(formRole)
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
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          mb: 3,
          color: "var(--app-font-color)",
          position: "relative"
        }}>
        Create New Role
        <Button
          sx={{ position: "absolute", top: 0, right: 0 }}
          onClick={() => navigate(-1)}>
          <Close />
        </Button>
      </Typography>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <TextField
          fullWidth
          label="Role Name"
          name="name"
          value={formRole.name}
          onChange={handleChange}
          margin="normal"
          required />
        <TextField
          fullWidth
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
                <Checkbox checked={formRole.permissions.some((p) => p.id === permission.id)}
                          onChange={() => handlePermissionSelection(permission)} />}
              label={permission.name} />))}
        </FormGroup>
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>
    </Box>
  );
}

export default ModifyRolePage;

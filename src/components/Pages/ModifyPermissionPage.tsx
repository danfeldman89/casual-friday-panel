import React, { useEffect, useState } from "react";
import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Close } from "@mui/icons-material";
import { createPermissionApi, updatePermissionApi } from "../../api/permissions";
import { Permission } from "../../types/types";

function ModifyPermissionPage() {
  const navigate = useNavigate();
  const permissions = useSelector((state: RootState) => state.permissions.permissionsCollection);
  const { id } = useParams<{ id: string }>();

  const [formPermission, setFormPermission] = useState<Permission>({
                                                                     id: "",
                                                                     name: "",
                                                                     resource: "",
                                                                     canRead: false,
                                                                     canWrite: false
                                                                   });

  useEffect(() => {
    if (id) {
      const selectedPermission = permissions.find((perm: Permission) => perm.id === id);
      if (selectedPermission) setFormPermission(selectedPermission);
    }
  }, [id, permissions]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormPermission((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormPermission((prev) => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      updatePermissionApi(id, formPermission)
        .then((response) => {
          if (response.ok) {
            alert("Permission updated successfully!");
            navigate("/permissions");
          } else {
            return response.json().then((error) => {
              alert(`Failed to update permission: ${error.message}`);
            });
          }
        })
        .catch((error) => {
          alert(`An unexpected error occurred: ${error}`);
        });
    } else {
      createPermissionApi(formPermission)
        .then((response) => {
          if (response.ok) {
            alert("Permission created successfully!");
            navigate("/permissions");
          } else {
            return response.json().then((error) => {
              alert(`Failed to create permission: ${error.message}`);
            });
          }
        })
        .catch((error) => {
          alert(`An unexpected error occurred: ${error}`);
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
        {id ? "Edit Permission" : "Create New Permission"}
        <Button sx={{ position: "absolute", top: 0, right: 0 }} onClick={() => navigate(-1)}>
          <Close />
        </Button>
      </Typography>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <TextField fullWidth
                   label="Permission Name"
                   name="name"
                   value={formPermission.name}
                   onChange={handleChange}
                   margin="normal"
                   required />
        <TextField fullWidth
                   label="Resource"
                   name="resource"
                   value={formPermission.resource}
                   onChange={handleChange}
                   margin="normal"
                   required />
        <FormControlLabel control={
          <Checkbox
            checked={formPermission.canRead}
            name="canRead"
            onChange={handleCheckboxChange} />
        }
                          label="Can Read" />
        <FormControlLabel control={
          <Checkbox
            checked={formPermission.canWrite}
            name="canWrite"
            onChange={handleCheckboxChange} />
        }
                          label="Can Write" />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          {id ? "Update Permission" : "Create Permission"}
        </Button>
      </form>
    </Box>
  );
}

export default ModifyPermissionPage;

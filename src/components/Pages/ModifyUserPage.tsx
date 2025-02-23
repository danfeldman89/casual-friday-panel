import React, { useEffect, useState } from "react";
import { Box, Button, Checkbox, FormControlLabel, FormGroup, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store.ts";
import { useNavigate, useParams } from "react-router-dom";
import { Close } from "@mui/icons-material";
import { createUserApi, updateUserApi } from "../../api/user.ts";
import { User } from "../../types/types.tsx"; // Ensure you have a function to fetch a user by ID

function ModifyUserPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const roles = useSelector((state: RootState) => state.roles.rolesCollection);
  const users = useSelector((state: RootState) => state.users.usersCollection);

  const { id } = useParams<{ id: string }>();

  const [formUser, setFormUser] = useState({
                                             id: "",
                                             username: "",
                                             email: "",
                                             password: "",
                                             isActive: true, // Default to true
                                             roleIds: [] as string[] // Default to an empty array
                                           });

  useEffect(() => {
    if (id) {
      const searchedUser = users.find((u: User) => u.id === id);
      if (searchedUser) {
        setFormUser(searchedUser);
      }
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormUser((prev) => ({ ...prev, isActive: e.target.checked }));
  };

  const handleRoleSelection = (roleId: string) => {
    setFormUser((prev) => {
      const isSelected = prev.roleIds.includes(roleId);
      const updatedRoleIds = isSelected
                             ? prev.roleIds.filter((id) => id !== roleId)
                             : [...prev.roleIds, roleId];
      return { ...prev, roleIds: updatedRoleIds };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      // Update user logic
      updateUserApi(formUser)
        .then((response) => {
          if (response.ok) {
            alert("User updated successfully!");
            navigate("/dashboard");
          } else {
            return response.json().then((error) => {
              alert(`Failed to update user: ${error.message}`);
            });
          }
        })
        .catch((error) => {
          alert(`An unexpected error occurred while updating the user: ${error}`);
        });
    } else {
      // Create user logic
      createUserApi(formUser)
        .then((response) => {
          if (response.ok) {
            alert("User created successfully!");
            navigate("/dashboard");
          } else {
            return response.json().then((error) => {
              alert(`Failed to create user: ${error.message}`);
            });
          }
        })
        .catch((error) => {
          alert(`An unexpected error occurred while creating the user: ${error}`);
        });
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "auto",
        mt: 4,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          mb: 3,
          color: "var(--app-font-color)",
          position: "relative"
        }}
      >
        {id ? "Edit User" : "Create New User"}
        <Button
          sx={{ position: "absolute", top: 0, right: 0 }}
          onClick={() => navigate(-1)}>
          <Close />
        </Button>
      </Typography>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}
      >
        <TextField
          fullWidth
          label="Username"
          name="username"
          value={formUser.username}
          onChange={handleChange}
          margin="normal"
          required />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formUser.email}
          onChange={handleChange}
          margin="normal"
          type="email"
          required />
        <TextField
          fullWidth
          label="Password"
          name="password"
          value={formUser.password}
          onChange={handleChange}
          margin="normal"
          type="password"
          required />
        <FormControlLabel
          sx={{ alignSelf: "center" }}
          control={<Checkbox checked={formUser.isActive} onChange={handleCheckboxChange} />}
          label="Is Active" />
        <FormGroup sx={{ mt: 2 }}>
          {roles.map((role) => (
            <FormControlLabel
              key={role.id}
              control={
                <Checkbox
                  checked={formUser.roleIds.includes(role.id)}
                  onChange={() => handleRoleSelection(role.id)} />
              }
              label={role.name}
            />
          ))}
        </FormGroup>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>
    </Box>
  );
}

export default ModifyUserPage;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store.ts";
import { createBoosterApi, updateBoosterApi } from "../../api/boosters";
import { Booster } from "../../types/types";

function CreateBoosterPage() {
  const { catalogId, boosterIndex } = useParams<{ catalogId: string; boosterIndex: string }>();
  const navigate = useNavigate();
  const boosters = useSelector((state: RootState) => state.boosters);
  const [formBooster, setFormBooster] = useState<Booster>({
                                                            name: "",
                                                            description: "",
                                                            type: 1,
                                                            price: 0,
                                                            duration: 0,
                                                            isActive: true
                                                          });

  useEffect(() => {
    const catalog = boosters.boosterCatalogs.find((collection) => collection.id === catalogId);
    const boosterData = catalog?.boosters?.[Number(boosterIndex)];
    if (boosterData) setFormBooster(boosterData);

  }, [boosterIndex, catalogId, boosters]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setFormBooster((prev) => ({
      ...prev,
      [name as string]:
        name === "price" || name === "duration" ? parseFloat(value as string) : value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormBooster((prev) => ({
      ...prev,
      [e.target.name]: e.target.checked
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (boosterIndex) {
      updateBoosterApi(boosterIndex, catalogId, formBooster)
        .then((response) => {
          if (response.ok) {
            alert("Booster updated successfully!");
            navigate("/dashboard");
          } else {
            return response.json().then((error) => {
              alert(`Failed to update booster: ${error.message}`);
            });
          }
        })
        .catch((error) => {
          alert(`An unexpected error occurred while updating the booster: ${error}`);
        });
    } else {
      createBoosterApi(formBooster, boosters.boostersIndex)
        .then((response) => {
          if (response.ok) {
            alert("Booster created successfully!");
            navigate("/dashboard");
          } else {
            return response.json().then((error) => {
              alert(`Failed to create booster: ${error.message}`);
            });
          }
        })
        .catch((error) => {
          alert(`An unexpected error occurred while creating the booster: ${error}`);
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
        {boosterIndex ? "Edit Booster" : "Create New Booster"}
        <Button sx={{ position: "absolute", top: 0, right: 0 }} onClick={() => navigate(-1)}>
          <Close />
        </Button>
      </Typography>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <TextField fullWidth
                   label="Booster Name"
                   name="name"
                   value={formBooster.name}
                   onChange={handleChange}
                   margin="normal"
                   required />
        <TextField fullWidth
                   label="Description"
                   name="description"
                   value={formBooster.description}
                   onChange={handleChange}
                   margin="normal"
                   multiline
                   rows={4}
                   required />

        <FormControl fullWidth margin="normal" required>
          <InputLabel id="type-label">Booster Type</InputLabel>
          <Select labelId="type-label"
                  name="type"
                  value={formBooster.type}
                  onChange={handleChange}
                  label="Booster Type">
            <MenuItem value={0}>Type 0</MenuItem>
            <MenuItem value={1}>Type 1</MenuItem>
            <MenuItem value={2}>Type 2</MenuItem>
            <MenuItem value={3}>Type 3</MenuItem>
          </Select>
        </FormControl>
        <TextField type="number"
                   fullWidth
                   label="Price"
                   name="price"
                   value={formBooster.price}
                   onChange={handleChange}
                   margin="normal"
                   required />
        <TextField type="number"
                   fullWidth
                   label="Duration (in minutes)"
                   name="duration"
                   value={formBooster.duration}
                   onChange={handleChange}
                   margin="normal"
                   required />
        <FormControlLabel control={
          <Checkbox name="isActive"
                    checked={formBooster.isActive}
                    onChange={handleCheckboxChange} />}
                          label="Is Active"
                          sx={{ mt: 2 }} />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>
    </Box>
  );
}

export default CreateBoosterPage;

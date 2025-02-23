import { Alert, Box, Button, CircularProgress, MenuItem, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Booster, BoosterResponse, isPermitted } from "../../types/types";
import { useEffect, useState } from "react";
import { deleteBoosterApi, getBoostersApi } from "../../api/boosters";
import { useDispatch, useSelector } from "react-redux";
import { deleteBooster, updateBoosters } from "../../store/boosterSlice";
import { RootState } from "../../store/store";
import { useCurrentUser } from "../../hooks/useCurrentUser.ts";

function BoostersTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedType, setSelectedType] = useState<string>("all");

  const boosters = useSelector((state: RootState) => state.boosters);
  const current = useCurrentUser();

  useEffect(() => {
    getBoostersApi()
      .then((response) => response.json())
      .then((boosters: BoosterResponse[]) => dispatch(updateBoosters(boosters)))
      .catch((err: any) => setError(err.message))
      .finally(() => setLoading(false));
  }, [dispatch]);

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    setSelectedType(event.target.value);
  };

  const filteredBoosters = selectedType === "all"
                           ? boosters.boostersCollection
                           : boosters.boostersCollection.filter((booster) => booster.type.toString() === selectedType);

  const getUniqueBoosterTypes = (boosters: Booster[]) => {
    const types = new Set<number>(boosters.map((booster) => booster.type));
    return Array.from(types);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <TableContainer>
      <Box sx={{ display: "flex", gap: 2, marginBottom: 2, alignItems: "center", padding: "0 2rem" }}>
        <Button
          startIcon={<Add />}
          variant="contained"
          color="primary"
          onClick={() => navigate('/create-booster')}>
          Add Booster
        </Button>

        <Select
          value={selectedType}
          onChange={handleTypeChange}
          displayEmpty
          variant="outlined"
          size="small">
          <MenuItem value="all">All Types</MenuItem>
          {getUniqueBoosterTypes(boosters.boostersCollection).map((type) => (
            <MenuItem key={type} value={type.toString()}>Type {type}</MenuItem>
          ))}
        </Select>
      </Box>

      {filteredBoosters.length === 0 ? (
        <Typography variant="h6" align="center">
          No boosters found for the selected type.
        </Typography>
      ) : (
         <Table>
           <TableHead>
             <TableRow>
               <TableCell>Booster Name</TableCell>
               <TableCell>Description</TableCell>
               <TableCell align="center">Price</TableCell>
               <TableCell align="center">Duration</TableCell>
               <TableCell align="center">Status</TableCell>
               <TableCell align="center"></TableCell>
             </TableRow>
           </TableHead>
           <TableBody>
             {filteredBoosters.map((booster) => (
               <TableRow key={booster.name}>
                 <TableCell>{booster.name}</TableCell>
                 <TableCell>{booster.description}</TableCell>
                 <TableCell align="center">${booster.price}</TableCell>
                 <TableCell align="center">{booster.duration} days</TableCell>
                 <TableCell align="center">{booster.isActive ? "Active" : "Inactive"}</TableCell>
                 {isPermitted(current, 'Catalogs', 'Write') && <TableCell align="center">
                     <Button sx={{ margin: "0 0.5rem" }}
                             variant="outlined"
                             size="small"
                             onClick={() => navigate(`/edit-booster/${booster}`)}>
                         Edit
                     </Button>
                     <Button sx={{ margin: "0 0.5rem" }}
                             variant="outlined"
                             size="small"
                             onClick={() => {
                               const boosterIndex = boosters.boostersCollection.findIndex((boosterInCatalog) => boosterInCatalog.name === booster.name);
                               dispatch(deleteBooster(booster.name));
                               deleteBoosterApi(boosterIndex.toString(), boosters.boostersIndex);
                             }}>
                         Delete
                     </Button>
                 </TableCell>}
               </TableRow>
             ))}
           </TableBody>
         </Table>
       )}
    </TableContainer>
  );
}

export default BoostersTable;

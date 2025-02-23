import { Alert, Box, Button, CircularProgress, MenuItem, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Booster, BoosterCatalog } from "../../types/types";
import { useEffect, useState } from "react";
import { deleteBoosterApi, getBoostersApi } from "../../api/boosters";
import { useDispatch, useSelector } from "react-redux";
import { deleteBooster, updateBoosters } from "../../store/boosterSlice";
import { RootState } from "../../store/store";

function BoostersTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const boosters = useSelector((state: RootState) => state.boosters);

  const [filteredBoosters, setFilteredBoosters] = useState<Booster[]>([]);

  useEffect(() => {
    getBoostersApi()
      .then((response) => response.json())
      .then((boosters: BoosterCatalog[]) =>
              dispatch(updateBoosters(boosters))
      )
      .catch((err: any) => setError(err.message))
      .finally(() => setLoading(false));
  }, [dispatch]);

  const handleTypeChange = (event: SelectChangeEvent) => {
    setSelectedType(event.target.value);
  };

  useEffect(() => {
    const filtered = boosters.boostersCollection.filter((booster) => {
      const matchesType =
        selectedType === "all" || booster.type.toString() === selectedType;

      const matchesSearch =
        booster.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booster.description
               .toLowerCase()
               .includes(searchQuery.toLowerCase());

      return matchesType && matchesSearch;
    });

    setFilteredBoosters(filtered);
  }, [selectedType, searchQuery, boosters.boostersCollection]);

  const getUniqueBoosterTypes = (boosters: Booster[]) => {
    const types = new Set<number>(boosters.map((booster) => booster.type));
    return Array.from(types);
  };

  if (loading) {
    return (
      <Box display="flex"
           justifyContent="center"
           alignItems="center"
           height="100vh">
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
      <Box sx={{
        display: "flex",
        gap: 2,
        marginBottom: 2,
        alignItems: "center",
        padding: "0 2rem"
      }}>
        <Button startIcon={<Add />}
                variant="contained"
                color="primary"
                onClick={() => navigate("/create-booster")}>
          Add Booster
        </Button>

        <Select value={selectedType}
                onChange={handleTypeChange}
                displayEmpty
                variant="outlined"
                size="small" sx={{ width: "200px", textAlign: "left" }}>
          <MenuItem value="all">All Types</MenuItem>
          {getUniqueBoosterTypes(boosters.boostersCollection).map((type) => (
            <MenuItem key={type} value={type.toString()}>
              Type {type}
            </MenuItem>
          ))}
        </Select>

        <Box sx={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between"
        }}
        >
          <input type="text"
                 placeholder="Search boosters..."
                 style={{
                   padding: "8px",
                   fontSize: "14px",
                   border: "1px solid #ccc",
                   borderRadius: "4px",
                   width: "100%",
                   maxWidth: "300px",
                   marginRight: "1rem"
                 }}
                 onChange={(e) => setSearchQuery(e.target.value)} />
        </Box>
      </Box>

      {filteredBoosters.length === 0 ? (
        <Typography sx={{ padding: "1rem" }} variant="subtitle1">
          No boosters found.
        </Typography>
      ) : (
         <Table>
           <TableHead>
             <TableRow>
               <TableCell>Name</TableCell>
               <TableCell>Description</TableCell>
               <TableCell>Type</TableCell>
               <TableCell>Actions</TableCell>
             </TableRow>
           </TableHead>
           <TableBody>
             {filteredBoosters.map((booster) => (
               <TableRow key={booster.name}>
                 <TableCell>{booster.name}</TableCell>
                 <TableCell>{booster.description}</TableCell>
                 <TableCell>{booster.type}</TableCell>
                 <TableCell>
                   <Button
                     size="small"
                     color="primary"
                     onClick={() => {
                       const boosterIndex = boosters.boostersCollection.findIndex((boosterInCatalog) => boosterInCatalog.name === booster.name);
                       dispatch(deleteBooster(booster.name));
                       deleteBoosterApi(boosterIndex.toString(), boosters.boostersIndex);
                     }}>
                     Delete
                   </Button>
                 </TableCell>
               </TableRow>
             ))}
           </TableBody>
         </Table>
       )}
    </TableContainer>
  );
}

export default BoostersTable;

import React, { useEffect, useState } from "react";
import {
  Button,
  Stack,
  Typography,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import DeleteForeverOutlined from "@mui/icons-material/DeleteForeverOutlined";
import BorderColorOutlined from "@mui/icons-material/BorderColorOutlined";
import RemoveRedEyeOutlined from "@mui/icons-material/RemoveRedEyeOutlined";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";

// Styled table cell
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

// Styled table row
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Infermiers = ({ infermiersData, setInfermiersData }) => {
  const category = "infermiers";

  const theme = useTheme();
  const navigate = useNavigate();
  const [updatedInfermiersData, setUpdatedInfermiersData] = useState(
    infermiersData || []
  );
  const [isInfermierDeleted, setIsInfermierDeleted] = useState(false);

  // Function to handle infermier deletion
  const handleDelete = async (id) => {
    try {
      console.log(`Suppression de l'infirmier avec l'ID : ${id}`);

      const response = await fetch(
        "http://localhost/version1-main/Project_Complete-master/api/deleteRecord.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
            category: "infermiers", // catégorie à supprimer
          }),
          // credentials: "include", // Décommente si tu utilises des sessions/cookies
        }
      );

      if (!response.ok) {
        throw new Error(`Erreur HTTP ! statut : ${response.status}`);
      }

      const data = await response.json();
      console.log("Réponse du serveur :", data);

      if (data.success) {
        // Mise à jour des données localement en supprimant l'infirmier
        setInfermiersData((prev) =>
          prev.filter((infermier) => infermier.id !== id)
        );
        alert("L'infirmier a été supprimé avec succès");
      } else {
        alert(data.message || "Échec de la suppression de l'infirmier");
      }
    } catch (error) {
      console.error("Détails de l'erreur :", error);
      alert(`Une erreur s'est produite : ${error.message}`);
    }
  };

  useEffect(() => {
    if (isInfermierDeleted) {
      navigate("/infermiers");
    }
  }, [isInfermierDeleted, navigate]);

  //search

  const [infermiersFiltered, setInfermiersFiltered] = useState([]);
  const [search, setSearch] = useState("");

  // Function to handle search changes
  const handleSearchChange = (event) => {
    const searchTerm = event.target.value; // Get the search term
    setSearch(searchTerm);

    // Filter infermiers by both nom (last name) and prenom (first name)
    const infermiersFiltered = infermiersData.filter((infermier) => {
      const searchTermLower = searchTerm.toLowerCase();

      return (
        infermier.nom?.toLowerCase().includes(searchTermLower) ||
        "" ||
        infermier.prenom?.toLowerCase().includes(searchTermLower) ||
        "" ||
        infermier.pb?.toLowerCase().includes(searchTermLower) ||
        "" ||
        infermier.email?.toLowerCase().includes(searchTermLower) ||
        "" ||
        infermier.numero_Tele?.includes(searchTerm) ||
        "" ||
        infermier.id?.toString().includes(searchTerm) ||
        "" ||
        infermier.adress?.toLowerCase().includes(searchTermLower) ||
        "" ||
        infermier.age?.toLowerCase().includes(searchTermLower) ||
        "" ||
        infermier.departement?.toLowerCase().includes(searchTermLower) ||
        ""
      );
    });

    setInfermiersFiltered(infermiersFiltered); // Update the filtered infermiers list
  };

  // Effect to update the infermiersFiltered when infermiersData changes
  useEffect(() => {
    setInfermiersFiltered(infermiersData); // Update the filtered infermiers list
  }, [infermiersData]);

  return (
    <>
      {/* Header Section */}
      <Stack
        direction={"row"}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          p: "20px",
        }}
      >
        <Typography variant="h1">Liste des Infermiers</Typography>
      </Stack>
      <Stack
        direction={"row"}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          py: "20px",
          px: "8px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            value={search}
            sx={{
              width: "25%",
              minWidth: "400px",
              flexGrow: 0.4,
            }}
            variant="outlined"
            placeholder="  chercher un infermier"
            onChange={handleSearchChange}
          />
          <Button variant="outlined" sx={{ p: "12px", fontSize: "28px" }}>
            <SearchIcon sx={{ fontSize: "29px" }} />
          </Button>
        </Box>

        <Button
          onClick={() => navigate(`/admin/infermiers/add/${category}`)} // Redirect to Add page
          sx={{
            p: "12px 18px",
            display: "flex",
            gap: "12px",
            bgcolor: theme.palette.secondary.main,
          }}
          variant="contained"
        >
          <AddCircleOutlineOutlined /> Ajouter un infermier
        </Button>
      </Stack>

      {/* Table Section */}
      <TableContainer component={Paper}>
        <Table
          sx={{
            textAlign: "center",
            bgcolor: theme.palette.background.paper,
            color: "white",
            minHeight: "100%",
            width: "100%",
            m: "auto",
            overflow: "hidden",
          }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">ID</StyledTableCell>
              <StyledTableCell align="center">Nom</StyledTableCell>
              <StyledTableCell align="center">Prénom</StyledTableCell>
              <StyledTableCell align="center">PB</StyledTableCell>
              <StyledTableCell align="center">N° Téléphone</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Age</StyledTableCell>
              <StyledTableCell align="center">Adresse</StyledTableCell>
              <StyledTableCell align="center">departement</StyledTableCell>
              <StyledTableCell align="center">Opérations</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {infermiersFiltered.length > 0 ? (
              infermiersFiltered.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell align="center">{row.id}</StyledTableCell>
                  <StyledTableCell align="center">{row.nom}</StyledTableCell>
                  <StyledTableCell align="center">{row.prenom}</StyledTableCell>
                  <StyledTableCell align="center">{row.pb}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.numero_Tele}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.email}</StyledTableCell>
                  <StyledTableCell align="center">{row.age}</StyledTableCell>
                  <StyledTableCell align="center">{row.adress}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.departement}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      onClick={() =>
                        navigate(`/infermiers/detail/${row.id}/infermiers`)
                      } // Use backticks for template literals
                      sx={{ color: theme.palette.info.light }}
                    >
                      <RemoveRedEyeOutlined />
                    </Button>

                    <Button
                      onClick={() =>
                        navigate(`/infermiers/update/${row.id}/${category}`)
                      }
                    >
                      <BorderColorOutlined
                        sx={{ color: theme.palette.success.light }}
                      />
                    </Button>

                    <Button
                      onClick={() => {
                        handleDelete(row.id);
                      }}
                    >
                      <DeleteForeverOutlined
                        sx={{ color: theme.palette.error.light }}
                      />
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={10} align="center">
                  Aucun médecin disponible
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Infermiers;

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Stack,
  Typography,
  useTheme,
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

const Patients = ({ patientsData, setPatientsData }) => {
  const category = "patients";
  const theme = useTheme();
  const navigate = useNavigate();
  const [updatedPatientsData, setUpdatedDoctoPatientsData] = useState(
    patientsData || []
  );

  const [isPatientDelated, setIsPatientDelated] = useState(false);

  const [patientsFiltered, setPatientsFiltered] = useState([]);
  const [search, setSearch] = useState("");

  // Function to handle patients deletion
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this patients?"))
      return;

    try {
      const response = await fetch(
        "http://localhost/version1-main/Project_Complete-master/api/deleteRecord.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, category: "patients" }),
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to delete");

      setPatientsData(patientsData.filter((patient) => patient.id !== id));
      alert("patient deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      alert(error.message);
    }
  };

  useEffect(() => {
    if (isPatientDelated) {
      navigate("/patients");
    }
  }, [isPatientDelated, navigate]);

  // Function to handle search changes
  const handleSearchChange = (event) => {
    const searchTerm = event.target.value; // Get the search term
    setSearch(searchTerm);

    // Filter patients by both nom (last name) and prenom (first name)
    const filteredPatients = patientsData.filter((patients) => {
      const searchTermLower = searchTerm.toLowerCase();

      return (
        patients.nom?.toLowerCase().includes(searchTermLower) ||
        "" ||
        patients.prenom?.toLowerCase().includes(searchTermLower) ||
        "" ||
        patients.pb?.toLowerCase().includes(searchTermLower) ||
        "" ||
        patients.email?.toLowerCase().includes(searchTermLower) ||
        "" ||
        patients.numero_Tele?.includes(searchTerm) ||
        "" ||
        patients.id?.toString().includes(searchTerm) ||
        "" ||
        patients.adress?.toLowerCase().includes(searchTermLower) ||
        "" ||
        patients.age?.toLowerCase().includes(searchTermLower) ||
        "" ||
        patients.departement?.toLowerCase().includes(searchTermLower) ||
        ""
      );
    });

    setPatientsFiltered(filteredPatients); // Update the filtered patients list
  };

  // Effect to update the filteredPatients when patientsData changes
  useEffect(() => {
    setPatientsFiltered(patientsData);
  }, [patientsData]);

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
        <Typography variant="h1">Liste des Patients</Typography>
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
            placeholder=" chercher un patient"
            onChange={handleSearchChange}
          />
          <Button variant="outlined" sx={{ p: "12px", fontSize: "28px" }}>
            <SearchIcon sx={{ fontSize: "29px" }} />
          </Button>
        </Box>

        <Button
          onClick={() => navigate(`/admin/patients/add/${category}`)} // Redirect to Add page
          sx={{
            p: "12px 18px",
            display: "flex",
            gap: "12px",
            bgcolor: theme.palette.secondary.main,
          }}
          variant="contained"
        >
          <AddCircleOutlineOutlined /> Ajouter un patient
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
              <StyledTableCell align="center">Téléphone</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Age</StyledTableCell>
              <StyledTableCell align="center">Adresse</StyledTableCell>
              <StyledTableCell align="center">Médecin traitant</StyledTableCell>
              <StyledTableCell align="center">
                Prochain rendez-vous
              </StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patientsFiltered.length > 0 ? (
              patientsFiltered.map((row) => (
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
                    {row.doctor_traitant}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.rendezVous}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      onClick={() =>
                        navigate(`/patients/detail/${row.id}/patients`)
                      } // Use backticks for template literals
                      sx={{ color: theme.palette.info.light }}
                    >
                      <RemoveRedEyeOutlined />
                    </Button>

                    <Button
                      onClick={() =>
                        navigate(`/patients/update/${row.id}/patients`)
                      }
                    >
                      <BorderColorOutlined
                        sx={{ color: theme.palette.success.light }}
                      />
                    </Button>

                    <Button onClick={() => handleDelete(row.id)}>
                      <DeleteForeverOutlined
                        sx={{ color: theme.palette.error.light }}
                      />
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={12} align="center">
                  Aucun patient disponible
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Patients;

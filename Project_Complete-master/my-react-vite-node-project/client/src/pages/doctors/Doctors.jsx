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

const Doctors = ({ doctorsData, setDoctorsData }) => {
  const category = "doctors";
  const theme = useTheme();
  const navigate = useNavigate();
  const [updatedDoctorsData, setUpdatedDoctorsData] = useState(
    doctorsData || []
  );

  const [isDoctorDelated, setIsDoctorDelated] = useState(false);

  const [doctorsFiltered, setDoctorsFiltered] = useState([]);
  const [search, setSearch] = useState("");

  // Function to handle doctor deletion
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this doctor?")) return;

    try {
      const response = await fetch(
        "http://localhost/version1-main/Project_Complete-master/api/deleteRecord.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, category: "doctors" }),
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to delete");

      setDoctorsData(doctorsData.filter((doctor) => doctor.id !== id));
      alert("Doctor deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      alert(error.message);
    }
  };

  useEffect(() => {
    if (isDoctorDelated) {
      navigate("/doctors");
    }
  }, [isDoctorDelated, navigate]);

  // Function to handle search changes
  const handleSearchChange = (event) => {
    const searchTerm = event.target.value; // Get the search term
    setSearch(searchTerm);

    // Filter doctors by both nom (last name) and prenom (first name)
    const filteredDoctors = doctorsData.filter((doctor) => {
      const searchTermLower = searchTerm.toLowerCase();

      return (
        doctor.nom?.toLowerCase().includes(searchTermLower) ||
        "" ||
        doctor.prenom?.toLowerCase().includes(searchTermLower) ||
        "" ||
        doctor.pb?.toLowerCase().includes(searchTermLower) ||
        "" ||
        doctor.email?.toLowerCase().includes(searchTermLower) ||
        "" ||
        doctor.numero_Tele?.includes(searchTerm) ||
        "" ||
        doctor.id?.toString().includes(searchTerm) ||
        "" ||
        doctor.adress?.toLowerCase().includes(searchTermLower) ||
        "" ||
        doctor.age?.toLowerCase().includes(searchTermLower) ||
        "" ||
        doctor.departement?.toLowerCase().includes(searchTermLower) ||
        ""
      );
    });

    setDoctorsFiltered(filteredDoctors); // Update the filtered doctors list
  };

  // Effect to update the doctorsFiltered when doctorsData changes
  useEffect(() => {
    setDoctorsFiltered(doctorsData);
  }, [doctorsData]);

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
        <Typography variant="h1">Liste des Doctors</Typography>
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
            placeholder=" chercher un doctor"
            onChange={handleSearchChange}
          />
          <Button variant="outlined" sx={{ p: "12px", fontSize: "28px" }}>
            <SearchIcon sx={{ fontSize: "29px" }} />
          </Button>
        </Box>

        <Button
          onClick={() => navigate(`/admin/doctors/add/${category}`)} // Redirect to Add page
          sx={{
            p: "12px 18px",
            display: "flex",
            gap: "12px",
            bgcolor: theme.palette.secondary.main,
          }}
          variant="contained"
        >
          <AddCircleOutlineOutlined /> Ajouter un doctor
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
              <StyledTableCell align="center">Département</StyledTableCell>
              <StyledTableCell align="center">EMPLOI DU TEMPS</StyledTableCell>
              <StyledTableCell align="center">Opérations</StyledTableCell>
            </TableRow>
                
          </TableHead>
          <TableBody>
            {doctorsFiltered.length > 0 ? (
              doctorsFiltered.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell
                    sx={{ color: theme.palette.text.primary }}
                    align="center"
                  >
                    {row.id}
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{ color: theme.palette.text.primary }}
                    align="center"
                  >
                    {row.nom}
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{ color: theme.palette.text.primary }}
                    align="center"
                  >
                    {row.prenom}
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{ color: theme.palette.text.primary }}
                    align="center"
                  >
                    {row.pb}
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{ color: theme.palette.text.primary }}
                    align="center"
                  >
                    {row.numero_Tele}
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{ color: theme.palette.text.primary }}
                    align="center"
                  >
                    {row.email}
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{ color: theme.palette.text.primary }}
                    align="center"
                  >
                    {row.age}
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{ color: theme.palette.text.primary }}
                    align="center"
                  >
                    {row.adress}
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{ color: theme.palette.text.primary }}
                    align="center"
                  >
                    {row.departement}
                  </StyledTableCell>

                  <StyledTableCell
                    sx={{ color: theme.palette.text.primary }}
                    align="center"
                  >
                    <Button
                      onClick={() =>
                        navigate(`/doctors/schedule/${row.id}/doctors`)
                      }
                      sx={{
                        textAlign: "center",
                        color: theme.palette.primary.main,
                      }}
                    >
                      Voir emploi
                    </Button>
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    <Button
                      onClick={() =>
                        navigate(`/doctors/detail/${row.id}/doctors`)
                      } // Use backticks for template literals
                      sx={{ color: theme.palette.info.light }}
                    >
                      <RemoveRedEyeOutlined />
                    </Button>

                    <Button
                      onClick={() =>
                        navigate(`/doctors/update/${row.id}/doctors`)
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
                <StyledTableCell
                  sx={{ color: theme.palette.text.primary }}
                  colSpan={10}
                  align="center"
                >
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

export default Doctors;

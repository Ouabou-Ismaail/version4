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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Departements = ({ departementsData, setDepartementsData }) => {
  const category = "departements";
  const theme = useTheme();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [departementsFiltered, setDepartementsFiltered] = useState([]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this department?"))
      return;

    try {
      const response = await fetch(
        "http://localhost/version1-main/Project_Complete-master/api/deleteRecord.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, category }),
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to delete");

      setDepartementsData(departementsData.filter((d) => d.id !== id));
      alert("Department deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      alert(error.message);
    }
  };

  useEffect(() => {
    setDepartementsFiltered(departementsData);
  }, [departementsData]);

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    setSearch(searchTerm);

    const filteredDepartements = departementsData.filter((d) => {
      const searchLower = searchTerm.toLowerCase();

      return (
        d.nom?.toLowerCase().includes(searchLower) ||
        d.id?.toString().includes(searchLower)
      );
    });

    setDepartementsFiltered(filteredDepartements);
  };

  return (
    <>
      {/* Header */}
      <Stack
        direction={"row"}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          p: "20px",
        }}
      >
        <Typography variant="h1">Liste des Départements</Typography>
      </Stack>

      {/* Search + Add */}
      <Stack
        direction={"row"}
        sx={{
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
            sx={{ width: "25%", minWidth: "400px", flexGrow: 0.4 }}
            variant="outlined"
            placeholder=" chercher un departement"
            onChange={handleSearchChange}
          />
          <Button variant="outlined" sx={{ p: "12px", fontSize: "28px" }}>
            <SearchIcon sx={{ fontSize: "29px" }} />
          </Button>
        </Box>

        <Button
          onClick={() => navigate(`/admin/departements/add/${category}`)}
          sx={{
            p: "12px 18px",
            display: "flex",
            gap: "12px",
            bgcolor: theme.palette.secondary.main,
          }}
          variant="contained"
        >
          <AddCircleOutlineOutlined /> Ajouter un département
        </Button>
      </Stack>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table
          sx={{
            textAlign: "center",
            bgcolor: theme.palette.background.paper,
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
              <StyledTableCell align="center">Total Médecins</StyledTableCell>
              <StyledTableCell align="center">Total Infirmiers</StyledTableCell>
              <StyledTableCell align="center">Total Patients</StyledTableCell>
              <StyledTableCell align="center">Opérations</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {departementsFiltered.length > 0 ? (
              departementsFiltered.map((row) => (
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
                  <StyledTableCell align="center">{row.totDoc}</StyledTableCell>
                  <StyledTableCell align="center">{row.totInf}</StyledTableCell>
                  <StyledTableCell align="center">{row.totPat}</StyledTableCell>

                  <StyledTableCell align="center">
                    <Button
                      onClick={() => navigate(`/detail/${row.id}/departements`)}
                      sx={{ color: theme.palette.info.light }}
                    >
                      <RemoveRedEyeOutlined />
                    </Button>

                    <Button
                      onClick={() =>
                        navigate(`/departements/update/${row.id}/departements`)
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
                  colSpan={6}
                  align="center"
                >
                  Aucun département disponible
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Departements;

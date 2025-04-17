import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  IconButton,
  Paper,
  Typography,
  Box,
  LinearProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Download as DownloadIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Schedule as ScheduleIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const DoctorSchedule = ({ doctorsData = [], setDoctorsData = () => {} }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const doctor = doctorsData.find((doc) => doc.id === parseInt(id));

  if (!doctor) {
    return (
      <Paper elevation={2} sx={{ mt: 4, p: 2 }}>
        <Typography variant="h6" color="error" align="center">
          Médecin introuvable. Veuillez vérifier l'ID.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/doctors")}
          >
            Retour
          </Button>
        </Box>
      </Paper>
    );
  }

  const defaultSchedule = [
    { day: "Lundi", start: "08:00", end: "13:00" },
    { day: "Mardi", start: "09:00", end: "14:00" },
    { day: "Mercredi", start: "10:00", end: "15:00" },
    { day: "Jeudi", start: "11:00", end: "16:00" },
    { day: "Vendredi", start: "12:00", end: "17:00" },
    { day: "Samedi", start: "07:00", end: "12:00" },
  ];

  const [schedule, setSchedule] = useState(doctor?.schedule || defaultSchedule);
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const formatTimeWithAMPM = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  const handleStartTimeChange = (index, newStartTime) => {
    const updatedSchedule = [...schedule];
    updatedSchedule[index].start = newStartTime;

    const [hours, minutes] = newStartTime.split(":").map(Number);
    const endHours = (hours + 5) % 24;
    updatedSchedule[index].end = `${endHours
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

    setSchedule(updatedSchedule);
    setHasChanges(
      JSON.stringify(updatedSchedule) !==
        JSON.stringify(doctor?.schedule || defaultSchedule)
    );
  };

  const handleSave = () => {
    try {
      const updatedDoctorsData = doctorsData.map((doc) =>
        doc.id === parseInt(id) ? { ...doc, schedule: schedule } : doc
      );
      setDoctorsData(updatedDoctorsData);
      setIsEditing(false);
      setHasChanges(false);
      setOpenDialog(true);
    } catch (error) {
      console.error("Error saving schedule:", error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSchedule(doctor.schedule || defaultSchedule);
    setHasChanges(false);
    setOpenDialog(false); // Close dialog if open
  };

  const handleDownloadPDF = () => {
    if (!doctor) return; // Ensure doctor data exists
    setIsDownloading(true);

    const doc = new jsPDF();

    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(33, 150, 243);
    doc.text("ZAGORAFUTURE - Emploi du Temps", 105, 20, { align: "center" });

    // Doctor Info
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Médecin: Dr. ${doctor.prenom} ${doctor.nom}`, 14, 35);
    doc.text(`ID: ${doctor.id}`, 14, 45);

    // Table
    autoTable(doc, {
      startY: 55,
      head: [["Jour", "Heure de début", "Heure de fin"]],
      body: schedule.map((entry) => [
        entry.day,
        formatTimeWithAMPM(entry.start),
        formatTimeWithAMPM(entry.end),
      ]),
      headStyles: {
        fillColor: [33, 150, 243],
        textColor: 255,
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240],
      },
      margin: { top: 10 },
    });

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("Généré par ZAGORAFUTURE", 105, 285, { align: "center" });

    setTimeout(() => {
      doc.save(`Emploi_du_Temps_${doctor.nom}_${doctor.prenom}.pdf`);
      setIsDownloading(false);
    }, 1500);
  };

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:hover": {
      backgroundColor: theme.palette.action.selected,
    },
  }));

  return (
    <Paper elevation={2} sx={{ mt: "-20px", ml: "-6px" }}>
      <Box sx={{ p: 2 }}>
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <IconButton
            onClick={() =>
              isEditing ? handleCancelEdit() : navigate("/doctors")
            }
            sx={{ mr: 2, color: "text.main" }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h4"
            component="h1"
            textAlign={"center"}
            sx={{ flexGrow: 1, color: "text.main", padding: "20px" }}
          >
            Modifier l'emploie de: Dr. {doctor.prenom} {doctor.nom}
          </Typography>
        </Box>

        {/* Schedule Table */}
        <Paper elevation={1} sx={{ borderRadius: 2, overflow: "hidden" }}>
          <TableContainer
            sx={{
              width: "100%",
              overflowX: "hidden",
              flexGrow: 1,
              position: "relative",
            }}
          >
            <Table
              sx={{
                width: "100%",
                flexGrow: 1,
                ml: "0px",
                mt: "0px",
                border: "none",
              }}
            >
              <TableHead sx={{ bgcolor: "primary.main" }}>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{ color: "common.white", fontWeight: "bold" }}
                  >
                    Jour
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "common.white", fontWeight: "bold" }}
                  >
                    Heure de début
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "common.white", fontWeight: "bold" }}
                  >
                    Heure de fin
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {schedule.map((entry, index) => (
                  <StyledTableRow key={index}>
                    <TableCell align="center">{entry.day}</TableCell>
                    <TableCell align="center">
                      {isEditing ? (
                        <TextField
                          type="time"
                          value={entry.start}
                          onChange={(e) =>
                            handleStartTimeChange(index, e.target.value)
                          }
                          size="small"
                          fullWidth
                        />
                      ) : (
                        formatTimeWithAMPM(entry.start)
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {formatTimeWithAMPM(entry.end)}
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Action Buttons */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 4 }}>
          {!isEditing ? (
            <>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => setIsEditing(true)}
                sx={{ px: 4, py: 1.5, borderRadius: 2 }}
              >
                Modifier
              </Button>
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                sx={{ px: 4, py: 1.5, borderRadius: 2 }}
              >
                Télécharger
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              disabled={!hasChanges || schedule.length === 0}
              sx={{ px: 4, py: 1.5, borderRadius: 2 }}
            >
              Enregistrer
            </Button>
          )}
        </Box>

        {/* Download Progress */}
        {isDownloading && (
          <Box sx={{ width: "100%", mt: 2 }}>
            <LinearProgress color="primary" />
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ mt: 1 }}
            >
              Génération du PDF en cours...
            </Typography>
          </Box>
        )}

        {/* Success Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Succès</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Les modifications ont été enregistrées avec succès !
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Paper>
  );
};

export default DoctorSchedule;

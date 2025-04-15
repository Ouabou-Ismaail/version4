import {
  Card,
  Paper,
  Stack,
  Typography,
  Button,
  Box,
  List,
  Link,
  Tooltip,
} from "@mui/material";
import React from "react";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import LineChart from "./LineChart";
import CategoryPatient from "./CategoryPatient";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AppBar from "@mui/material/AppBar";
import LogoutIcon from "@mui/icons-material/Logout";
import Toolbar from "@mui/material/Toolbar";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useNavigate } from "react-router-dom";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import StackedBarChartIcon from "@mui/icons-material/StackedBarChart";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";

const Statistiques = ({ category }) => {
  const navigate = useNavigate();

  return category === "admin" ? (
    <Stack
      direction={"column"}
      sx={{
        width: "100%",
        minHeight: "100vh",
        flexWrap: "wrap",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Card
        elevation={3}
        sx={{
          padding: "18px 80px",
          mb: "34px",
          fontSize: "28px",
          bgcolor: "#3f51b5",
          color: "white",
        }}
      >
        Les Statistiques
      </Card>

      <Stack
        direction={"row"}
        sx={{
          width: "100%",
          flexWrap: "wrap",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          mb: "20px",
        }}
      >
        <BarChart
          data={[
            { mois: "Janvier", rendezvous: 40 },
            { mois: "Février", rendezvous: 55 },
            { mois: "Mars", rendezvous: 65 },
            { mois: "Avril", rendezvous: 50 },
            { mois: "Mai", rendezvous: 70 },
            { mois: "Juin", rendezvous: 45 },
          ]}
        />
        <PieChart
          data={[
            {
              id: "Les Rendez-vous Validés",
              label: "Validés",
              value: 120,
              color: "hsl(120, 70%, 50%)",
            },
            {
              id: "Les Rendez-vous Annulés",
              label: "Annulés",
              value: 30,
              color: "hsl(0, 70%, 50%)",
            },
          ]}
        />
      </Stack>

      <Stack
        direction={"row"}
        sx={{
          width: "100%",
          flexWrap: "wrap",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <LineChart
          data={[
            {
              id: "Spécialités",
              data: [
                { x: "Cardiologue", y: 50 },
                { x: "Dermatologue", y: 30 },
                { x: "Pédiatre", y: 40 },
                { x: "Dentiste", y: 80 },
                { x: "ORL", y: 20 },
              ],
            },
          ]}
        />
        <CategoryPatient
          data={[
            {
              departement: "Urgence",
              Enfants: 120,
              Adultes: 200,
              Seniors: 80,
            },
            {
              departement: "Cardiologie",
              Enfants: 30,
              Adultes: 150,
              Seniors: 100,
            },
            {
              departement: "Pédiatrie",
              Enfants: 250,
              Adultes: 20,
              Seniors: 5,
            },
            {
              departement: "Radiologie",
              Enfants: 70,
              Adultes: 180,
              Seniors: 60,
            },
            {
              departement: "Chirurgie",
              Enfants: 40,
              Adultes: 220,
              Seniors: 90,
            },
          ]}
        />
      </Stack>
    </Stack>
  ) : (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar
            sx={{
              backgroundColor: "#3f51b9",
              color: "white",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <img
              src="/logo.png"
              alt="Logo"
              style={{
                width: "170px",
                height: "80px",
                padding: "5px",
                marginLeft: "50px",
              }}
            />

            <Box sx={{ display: "flex", gap: "20px" }}>
              <Tooltip title="Nombre des Rendez-vous par Mois" arrow>
                <Link
                  href="#NRVM"
                  sx={{
                    color: "rgb(211, 210, 210)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  <InsertChartIcon sx={{ mb: "4px" }} /> NRVM
                </Link>
              </Tooltip>

              <Tooltip title="Statistique des Annulations" arrow>
                <Link
                  href="#SA"
                  sx={{
                    color: "rgb(211, 210, 210)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  <DonutSmallIcon sx={{ mb: "4px" }} /> SA
                </Link>
              </Tooltip>

              <Tooltip
                title="Répartition des Rendez-vous selon les Spécialités"
                arrow
              >
                <Link
                  href="#RRVSS"
                  sx={{
                    color: "rgb(211, 210, 210)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  <ShowChartIcon sx={{ mb: "4px" }} /> RRVSS
                </Link>
              </Tooltip>

              <Tooltip title="Répartition des Patients par Tranche d'Âge" arrow>
                <Link
                  href="#RPTA"
                  sx={{
                    color: "rgb(211, 210, 210)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  <StackedBarChartIcon sx={{ mb: "4px" }} /> RPTA
                </Link>
              </Tooltip>
            </Box>

            <Button
              variant="contained"
              color="error"
              sx={{
                marginRight: "50px",
                textTransform: "capitalize",
                fontSize: "20px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
              onClick={() => {
                navigate("/");
              }}
            >
              <LogoutIcon /> log out
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Stack
        bgcolor={"rgb(239, 244, 255)"}
        direction={"column"}
        sx={{
          width: "100%",
          minHeight: "100vh",
          flexWrap: "wrap",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          pb: "84px",
          pt: "34px",
          mt: "70px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            textAlign: "left",
            display: "flex",
            justifyContent: "start",
          }}
          direction={"row"}
        >
          <ul
            style={{
              listStyleType: "none",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              padding: 0,
            }}
          >
            {[
              { abbr: "NRVM", desc: "Nombre des Rendez-vous par Mois" },
              { abbr: "SA", desc: "Statistique des Annulations" },
              {
                abbr: "RRVSS",
                desc: "Répartition des Rendez-vous selon les Spécialités",
              },
              {
                abbr: "RPTA",
                desc: "Répartition des Patients par Tranche d'Âge",
              },
            ].map((item, index) => (
              <li
                key={index}
                style={{
                  width: "100%",
                  textAlign: "left",
                  marginBottom: "20px",
                  textTransform: "capitalize",
                  fontSize: "17px",
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "25px",
                }}
              >
                <ArrowRightIcon style={{ marginRight: "8px" }} />
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    textDecoration: "underline",
                    marginLeft: "-8px",
                  }}
                >
                  {item.abbr}
                </span>
                : {item.desc}
              </li>
            ))}
          </ul>
        </Box>

        <Card
          elevation={3}
          sx={{
            padding: "18px 80px",
            mb: "34px",
            fontSize: "28px",
            bgcolor: "rgba(56, 152, 236, 0.9)",
            color: "white",
          }}
        >
          Les Statistiques
        </Card>

        <Stack
          direction={"row"}
          sx={{
            width: "100%",
            minHeight: "100vh",
            flexWrap: "wrap",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Stack
            id="NRVM"
            sx={{
              width: "95%",
              border: "2px solid rgb(73, 74, 81)",
              paddingTop: "40px",
              pl: "40px",
              mx: "auto",
              mb: "34px",
              display: "flex",
              justifyContent: "start",
            }}
            direction={"row"}
          >
            <BarChart
              data={[
                { mois: "Janvier", rendezvous: 40 },
                { mois: "Février", rendezvous: 55 },
                { mois: "Mars", rendezvous: 65 },
                { mois: "Avril", rendezvous: 50 },
                { mois: "Mai", rendezvous: 70 },
                { mois: "Juin", rendezvous: 45 },
              ]}
            />
            <Box direction={"column"} sx={{ padding: "40px" }}>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                <ArrowForwardIosIcon /> Lecture comparative des catégories de
                patients par service
              </Typography>

              <Typography
                variant="h6"
                style={{
                  width: "100%",
                  textAlign: "center",
                  marginBottom: "20px",
                  textTransform: "capitalize",
                  fontSize: "24px",
                  padding: "20px",
                  textAlign: "left",
                }}
              >
                Analyse semestrielle des rendez-vous médicaux" Les données
                montrent une progression des rendez-vous de janvier à mai, avec
                un pic notable en mai (70). La légère baisse en juin (45)
                pourrait indiquer un effet saisonnier. Cette tendance aide à
                anticiper les périodes d’affluence et à mieux organiser les
                ressources médicales.
              </Typography>
            </Box>
          </Stack>

          <Stack
            id="SA"
            direction={"row-reverse"}
            sx={{
              width: "95%",
              border: "2px solid rgb(91, 92, 97)",
              paddingTop: "40px",
              pr: "40px",
              mx: "auto",
              mb: "34px",
              display: "flex",
              justifyContent: "start",
            }}
          >
            <PieChart
              data={[
                {
                  id: "Les Rendez-vous Validés",
                  label: "Validés",
                  value: 120,
                  color: "hsl(120, 70%, 50%)",
                },
                {
                  id: "Les Rendez-vous Annulés",
                  label: "Annulés",
                  value: 30,
                  color: "hsl(0, 70%, 50%)",
                },
              ]}
            />
            <Box direction={"column"} sx={{ padding: "40px" }}>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                <ArrowForwardIosIcon /> Lecture de la répartition des
                rendez-vous validés et annulés
              </Typography>

              <Typography
                variant="h6"
                style={{
                  width: "100%",
                  textAlign: "center",
                  marginBottom: "20px",
                  textTransform: "capitalize",
                  fontSize: "24px",
                  padding: "20px",
                  textAlign: "left",
                }}
              >
                L’analyse montre que la majorité des rendez-vous sont validés
                (80 %), tandis que seuls 20 % sont annulés. Cette forte
                proportion de rendez-vous honorés reflète une bonne gestion et
                un engagement élevé des patients. Une telle stabilité permet une
                planification efficace des consultations médicales.
              </Typography>
            </Box>
          </Stack>

          <Stack
            id="RRVSS"
            sx={{
              width: "95%",
              border: "2px solid rgb(73, 74, 81)",
              paddingTop: "40px",
              pl: "40px",
              mx: "auto",
              mb: "34px",
              display: "flex",
              justifyContent: "start",
            }}
            direction={"row"}
          >
            <LineChart
              data={[
                {
                  id: "Spécialités",
                  data: [
                    { x: "Cardiologue", y: 50 },
                    { x: "Dermatologue", y: 30 },
                    { x: "Pédiatre", y: 40 },
                    { x: "Dentiste", y: 80 },
                    { x: "ORL", y: 20 },
                  ],
                },
              ]}
            />
            <Box direction={"column"} sx={{ padding: "40px" }}>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                <ArrowForwardIosIcon /> Lecture des rendez-vous par spécialité
                médicale
              </Typography>

              <Typography
                variant="h6"
                style={{
                  width: "100%",
                  textAlign: "center",
                  marginBottom: "20px",
                  textTransform: "capitalize",
                  fontSize: "24px",
                  padding: "20px",
                  textAlign: "left",
                }}
              >
                L’analyse révèle que la spécialité la plus sollicitée est la
                dentisterie avec 80 rendez-vous, suivie par la cardiologie (50)
                et la pédiatrie (40). Les spécialités comme la dermatologie et
                l’ORL enregistrent une demande plus modérée. Ces données
                permettent d’orienter les ressources et d’anticiper les besoins
                spécifiques selon les spécialités.
              </Typography>
            </Box>
          </Stack>

          <Stack
            id="RPTA"
            sx={{
              width: "95%",
              border: "2px solid rgb(73, 74, 81)",
              paddingTop: "40px",
              pr: "40px",
              mx: "auto",
              mb: "34px",
              display: "flex",
              justifyContent: "start",
            }}
            direction={"row-reverse"}
          >
            <CategoryPatient
              data={[
                {
                  departement: "Urgence",
                  Enfants: 120,
                  Adultes: 200,
                  Seniors: 80,
                },
                {
                  departement: "Cardiologie",
                  Enfants: 30,
                  Adultes: 150,
                  Seniors: 100,
                },
                {
                  departement: "Pédiatrie",
                  Enfants: 250,
                  Adultes: 20,
                  Seniors: 5,
                },
                {
                  departement: "Radiologie",
                  Enfants: 70,
                  Adultes: 180,
                  Seniors: 60,
                },
                {
                  departement: "Chirurgie",
                  Enfants: 40,
                  Adultes: 220,
                  Seniors: 90,
                },
              ]}
            />
            <Box direction={"column"} sx={{ padding: "40px" }}>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                <ArrowForwardIosIcon /> Lecture comparative des catégories de
                patients par service
              </Typography>

              <Typography
                variant="h6"
                style={{
                  width: "100%",
                  textAlign: "center",
                  marginBottom: "20px",
                  textTransform: "capitalize",
                  fontSize: "24px",
                  padding: "20px",
                  textAlign: "left",
                }}
              >
                L'analyse montre que les services d'Urgence, de Chirurgie et de
                Radiologie accueillent une majorité d'adultes. La Pédiatrie se
                distingue par une prédominance marquée des enfants, tandis que
                la Cardiologie affiche un équilibre entre adultes et seniors.
                Ces observations permettent d’adapter l’allocation des
                ressources humaines et matérielles selon les profils patients
                par service.
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default Statistiques;

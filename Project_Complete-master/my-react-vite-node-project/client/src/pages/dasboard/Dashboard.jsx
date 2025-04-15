import { Box, Button, Paper, Typography } from "@mui/material";
import VaccinesOutlinedIcon from "@mui/icons-material/VaccinesOutlined";
import { styled, useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const Dashboard = ({
  doctorsData,
  infermiersData,
  patientsData,
  departementsData,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const dashboardData = [
    {
      category: "total doctors",
      number: doctorsData?.length || 0,
      path: "/doctors", // Ceci est déjà correct
      icon: "/images/doctor.png",
      color: theme.palette.primary.main,
    },
    {
      category: "total infermiers",
      number: infermiersData?.length || 0,
      path: "/infermiers",
      icon: "/images/infermiere.png",
      color: theme.palette.secondary.main,
    },
    {
      category: "total patients",
      number: patientsData?.length || 0,
      path: "/patients",
      icon: "/images/patient.png",
      color: theme.palette.error.main,
    },
    {
      category: "total departements",
      number: departementsData?.length || 0,
      path: "/departements",
      icon: "/images/departement.png",
      color: theme.palette.warning.main,
    },
    {
      category: "Statistiques",
      path: "/statistiques",
      icon: "/images/statsicIcon.png",
      color: theme.palette.info.main,
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "20px",
        width: "100%",
        padding: 2,
        mt: "-25px",
      }}
    >
      {dashboardData.map((item) => (
        <Paper
          key={item.category}
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
            width: { xs: "100%", md: "49%" },
            minWidth: { xs: "unset", md: "600px" },
            textDecoration: "none",
            p: "34px",
            borderRadius: "12px",
            flexGrow: 1,
            transition: "transform 0.3s",
            "&:hover": {
              transform: "scale(1.02)",
            },
          }}
          elevation={4}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "start",
              gap: "10px",
            }}
          >
            <Box
              sx={{
                width: 100,
                height: 100,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {item.icon ? (
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                  src={item.icon}
                  alt={item.category}
                />
              ) : (
                <VaccinesOutlinedIcon sx={{ fontSize: 60 }} />
              )}
            </Box>

            <Typography
              sx={{
                fontSize: "30px",
                color: item.color,
                textTransform: "capitalize",
              }}
            >
              {item.category}
            </Typography>

            <Typography sx={{ fontSize: "30px", ml: "12px" }}>
              {item.number}
            </Typography>
          </Box>

          <Button
            sx={{
              position: "absolute",
              bottom: "35px",
              right: "35px",
              height: "fit-content",
              backgroundColor: theme.palette.success.light,
              "&:hover": {
                backgroundColor: theme.palette.success.dark,
              },
            }}
            variant="contained"
            onClick={() => navigate(item.path)} // Ceci est déjà correct
          >
            Plus de détails
          </Button>
        </Paper>
      ))}
    </Box>
  );
};

export default Dashboard;

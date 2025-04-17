import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton"; // Corrected import
import MenuIcon from "@mui/icons-material/Menu";
import "./IconMenu";
import {
  Link,
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Stack,
} from "@mui/material";
import Boutoun from "./btn";
import {
  FaUserMd,
  FaHeartbeat,
  FaHospital,
  FaLeaf,
  FaStethoscope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaHospitalAlt,
} from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../Map";

// Custom icon for the map
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const position = [30.3322, -5.8378];

const IconMenu = () => {
  const [open, setOpen] = useState(false);

  return (
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
            }}
          />
          <Box
            sx={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
              marginRight: "20px",
            }}
            className="linksHome"
          >
            <Link
              href="#home"
              sx={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Acceuil
            </Link>
            <Link
              href="#about"
              sx={{ color: "white", textDecoration: "none", cursor: "pointer" }}
            >
              A propos
            </Link>
            <Link href="#map" sx={{ color: "white", textDecoration: "none" }}>
              Location & Contact
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Box>
        <Stack
          id="home" // Added id for the "home" section
          sx={{
            width: "100%",
            height: "100vh",
            background: "#000",

            backgroundImage: "url('/home.jpg')",
            bgcolor: "#000",

            backgroundSize: "cover",
            backgroundPosition: "center",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            color: "white",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              backgroundColor: "rgba(178, 42, 42, 0.15)",
              padding: "25px 45px",
              borderRadius: "12px",
              fontWeight: "700",
              color: "#2d3748",
              fontFamily: "'Montserrat', sans-serif",
              textAlign: "center",
              letterSpacing: "1px",
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              background:
                "linear-gradient(145deg, rgba(197, 197, 197, 0.48) 0%, rgba(224, 224, 224, 0.47) 100%)",
              backdropFilter: "blur(5px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              textShadow: "1px 1px 2px rgba(163, 163, 163, 0.39)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow:
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              },
            }}
          >
            Bienvenue à IMA ZAGORA-FUTURE!
          </Typography>
          <Boutoun />
        </Stack>

        <Box className="propos-root" id="about">
          {" "}
          {/* Added id for the "about" section */}
          {/* Main Content */}
          <Container maxWidth="lg" className="main-content">
            <Typography variant="h3" className="section-title" gutterBottom>
              À propos de nous
            </Typography>
            <Typography className="section-description" paragraph>
              Fondé en 2030, l’Hôpital Zagora-Future est un centre de santé de
              référence, alliant technologie de pointe et humanité. Nous mettons
              tout en œuvre pour offrir les meilleurs soins médicaux, dans un
              cadre moderne et accueillant.
            </Typography>

            <Grid container spacing={4} className="info-grid">
              {/* Mission */}
              <Grid item xs={12} md={4}>
                <Paper className="info-card" elevation={4}>
                  <FaUserMd className="info-icon blue" />
                  <Typography variant="h5" className="info-title">
                    Notre mission
                  </Typography>
                  <Typography className="info-text">
                    Offrir des soins personnalisés et former la future
                    génération médicale.
                  </Typography>
                </Paper>
              </Grid>

              {/* Valeurs */}
              <Grid item xs={12} md={4}>
                <Paper className="info-card" elevation={4}>
                  <FaHeartbeat className="info-icon red" />
                  <Typography variant="h5" className="info-title">
                    Nos valeurs
                  </Typography>
                  <Typography className="info-text">
                    Excellence, innovation, et approche centrée sur le patient.
                  </Typography>
                </Paper>
              </Grid>

              {/* Spécialités */}
              <Grid item xs={12} md={4}>
                <Paper className="info-card" elevation={4}>
                  <FaHospital className="info-icon green" />
                  <Typography variant="h5" className="info-title">
                    Nos spécialités
                  </Typography>
                  <Typography className="info-text">
                    Cardiologie, neurologie, oncologie et imagerie avancée.
                  </Typography>
                </Paper>
              </Grid>

              {/* Environnement */}
              <Grid item xs={12} md={6}>
                <Paper className="info-card" elevation={4}>
                  <FaLeaf className="info-icon green" />
                  <Typography variant="h5" className="info-title">
                    Engagement écologique
                  </Typography>
                  <Typography className="info-text">
                    Nous intégrons des pratiques durables pour réduire notre
                    impact environnemental.
                  </Typography>
                </Paper>
              </Grid>

              {/* Équipe qualifiée */}
              <Grid item xs={12} md={6}>
                <Paper className="info-card" elevation={4}>
                  <FaStethoscope className="info-icon blue" />
                  <Typography variant="h5" className="info-title">
                    Équipe qualifiée
                  </Typography>
                  <Typography className="info-text">
                    Des professionnels expérimentés et passionnés au service des
                    patients 24h/24.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>

        <div className="contact-section" id="map">
          {" "}
          {/* Added id for the "map" section */}
          <div className="contact-header">
            <FaHospitalAlt className="contact-header-icon" />
            <h2>Nous Contacter & Localisation</h2>
            <p>
              Retrouvez-nous à Zagora et contactez-nous pour toute information
            </p>
          </div>
          <div className="contact-content">
            <div className="contact-details">
              <div className="detail">
                <FaMapMarkerAlt className="icon red" />
                <span>Av. Hassan II, Zagora, Maroc</span>
              </div>
              <div className="detail">
                <FaPhoneAlt className="icon blue" />
                <span>+212 528 82 34 56</span>
              </div>
              <div className="detail">
                <FaEnvelope className="icon green" />
                <span>contact@hopitalzagora.ma</span>
              </div>
              <div className="detail">
                <FaClock className="icon yellow" />
                <span>Lundi - Vendredi : 08h - 19h</span>
              </div>
            </div>

            <div className="map-container">
              <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                  attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position} icon={customIcon}>
                  <Popup>
                    Hôpital Zagora-Future <br /> Nous sommes ici !
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      </Box>
    </Box>
  );
};

// Add smooth scrolling behavior globally
document.documentElement.style.scrollBehavior = "smooth";

export default IconMenu;

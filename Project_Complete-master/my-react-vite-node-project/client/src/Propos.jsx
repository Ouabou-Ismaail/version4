"use client";
import React from "react";
import { Box, Container, Typography, Grid, Paper } from "@mui/material";
import {
  FaUserMd,
  FaHeartbeat,
  FaHospital,
  FaLeaf,
  FaStethoscope,
} from "react-icons/fa";
import "./Propos.css";

export default function Propos() {
  return (
    <Box className="propos-root" id="about">
      {/* Main Content */}
      <Container maxWidth="lg" className="main-content">
        <Typography variant="h3" className="section-title" gutterBottom>
          À propos de nous
        </Typography>
        <Typography className="section-description" paragraph>
          Fondé en 2030, l’Hôpital Zagora-Future est un centre de santé de
          référence, alliant technologie de pointe et humanité. Nous mettons
          tout en œuvre pour offrir les meilleurs soins médicaux, dans un cadre
          moderne et accueillant.
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
                Offrir des soins personnalisés et former la future génération
                médicale.
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
                Nous intégrons des pratiques durables pour réduire notre impact
                environnemental.
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
  );
}

import {
  Box,
  Button,
  Divider,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";

const ProfileAdmin = ({ adminData }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        flexDirection: "column",
        m: "auto",
        padding: "40px",
        width: "550px",
      }}
    >
      <Box
        sx={{
          width: "140px",
          height: "140px",
          borderRadius: "50%",
          overflow: "hidden",
          mb: "30px",
        }}
      >
        <img
          style={{ width: "100%", height: "100%" }}
          src="../../../public/images/doctor3.jpg"
        ></img>
      </Box>

      <Box>
        <Typography variant="h4">Name of Admin</Typography>
        <Typography variant="h6" color="#f00">
          Admin
        </Typography>
      </Box>

      <Divider
        sx={{
          bgcolor: "#f00",
          width: "100%",
          border: "1px solid gray",
          my: "14px",
        }}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "start",
          gap: "5px",
          width: "100%",
        }}
      >
        <ul>
          {Object.entries(adminData).map(([key, value]) =>
            key === "name" || key === "email" ? (
              <li
                key={key}
                style={{
                  fontSize: "26px",
                  textAlign: "left",
                  gap: "8px",
                  textTransform: "capitalize",
                }}
              >
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    fontWeight: "300",
                  }}
                  variant="h5"
                >
                  {key}:
                  <span
                    style={{
                      fontSize: "25px",
                      fontFamily: "cursive",
                      fontWeight: "900",
                    }}
                  >
                    {value}
                  </span>
                </Typography>
              </li>
            ) : null
          )}
        </ul>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          mt: "24px",
        }}
      >
        <Button
          variant="contained"
          sx={{
            bgcolor: theme.palette.info.light,
            width: "48%",
            padding: "8px 18px",
          }}
          onClick={() => {
            navigate("/detailAdmin");
          }}
        >
          Voir plus...
        </Button>

        <Button
          variant="contained"
          sx={{
            bgcolor: theme.palette.secondary.light,
            width: "48%",
            padding: "8px 18px",
          }}
          onClick={() => {
            navigate("/editAdmin");
          }}
        >
          Edit les donnees...
        </Button>
      </Box>
    </Paper>
  );
};

export default ProfileAdmin;

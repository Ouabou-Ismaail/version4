import React from "react";
import { Link } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./btn.css";

function Boutoun() {
  const navigate = useNavigate();
  return (
    <Stack direction={"row"} sx={{ gap: "60px", mt: "90px" }}>
      <Button
        onClick={() => {
          navigate("../CreateCompt");
        }}
        variant="contained"
        sx={{
          bgcolor: "rgba(52, 172, 191, 0.81)", // Updated to a green shade
          color: "white",
          fontSize: "19px",
          width: "240px",
          fontWeight: "bold",
          fontFamily: "serif garamond",
          border: "none",
          padding: "12px 24px", // Adjusted padding for consistency
          textTransform: "capitalize",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.3s, box-shadow 0.3s", // Slightly slower transition
          "&:hover": {
            bgcolor: "rgba(46, 179, 199, 0.81)", // Slightly darker green for hover
            transform: "scale(1.08)", // Increased hover scale
            boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.2)", // Enhanced shadow
          },
        }}
      >
        Creer un compte
      </Button>
      <Button
        onClick={() => {
          navigate("../Login");
        }}
        variant="outlined"
        sx={{
          color: "white",
          bgcolor: "rgba(52, 172, 191, 0.81)", // Updated to a blue shade
          fontWeight: "bold",
          fontFamily: "serif garamond",
          fontSize: "19px",

          width: "240px",
          padding: "12px 24px", // Adjusted padding for consistency
          textTransform: "capitalize",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.3s, box-shadow 0.3s", // Slightly slower transition
          "&:hover": {
            bgcolor: "rgba(46, 179, 199, 0.81)", // Slightly darker blue for hover
            transform: "scale(1.08)", // Increased hover scale
            boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.2)", // Enhanced shadow
          },
        }}
      >
        Login
      </Button>
    </Stack>
  );
}

export default Boutoun;

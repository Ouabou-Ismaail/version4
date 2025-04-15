import { Paper, Stack, TextField, Typography } from "@mui/material";
import React from "react";

const EditAdmin = ({ adminData }) => {
  return (
    <Paper sx={{ display: "flex", flexDirection: "column", width }}>
      <Typography>Edit les donnees de l'admin</Typography>
      <form>
        <TextField variant="outlined" label="full name"></TextField>
      </form>
    </Paper>
  );
};

export default EditAdmin;

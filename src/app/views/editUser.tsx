import { Box, Paper, Typography } from "@mui/material";
import React from "react";

function EditUser() {
  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: "column" }}>
      <Typography fontSize={"2.5pc"} color={(theme) => theme.palette.primary.dark}>Perfil</Typography>
      <Paper sx={{ flex: 0.5, padding: "1%" }}>
        asalsk
      </Paper>
    </Box>
  )
}

export default EditUser;

import React from "react";
import { Box, CssBaseline } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

const FullScreenContainer = ({ children }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        minWidth: "100vw",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CssBaseline />

      {children}
    </Box>
  );
};

export default FullScreenContainer;

import React from "react";
import { Box, CssBaseline } from "@mui/material";
import { useLocation } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const FullScreenContainer = ({ children }: Props) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        minWidth: "100vw",
        ...(isLoginPage && {
          alignItems: "center",
          justifyContent: "center",
        }),
      }}
    >
      <CssBaseline />

      {children}
    </Box>
  );
};

export default FullScreenContainer;

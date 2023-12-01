import React from 'react';
import { Box, Container, CssBaseline } from '@mui/material';

interface Props {
  children: React.ReactNode;
}

const FullScreenContainer = ({ children }: Props) => {
  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <CssBaseline />
      <Container
        component="div"
        maxWidth="md" // Ajuste o tamanho conforme necessário
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default FullScreenContainer;

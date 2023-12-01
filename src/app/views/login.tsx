import {
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useAppDispatch } from "core/hooks/reduxHooks";
import { login } from "core/redux/slices/authSlice";
import { useState } from "react";
import styled from "@emotion/styled";

const Logo = styled.div`
  background-color: #ccc;
  width: 14em;
  height: 14em;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;

const Login = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (email && password) {
      try {
        await dispatch(
          login({
            email,
            password,
          })
        ).unwrap();
      } catch (e) {
        console.error(e);
      }
    } else {
      // Show an error message.
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{ background: "#fff", borderRadius: 1, padding: 2 }}
      >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            padding: 1,
          }}
        >
          <Logo />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: 2,
            }}
          >
            <Typography variant="h6">Acesso para colaboradores</Typography>
            <TextField
              size="small"
              required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              size="small"
              required
              fullWidth
              id="password"
              name="password"
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Button
              sx={{ background: "rgba(16, 175, 205, 1)" }}
              fullWidth
              variant="contained"
              onClick={handleLogin}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;

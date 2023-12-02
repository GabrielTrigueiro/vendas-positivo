import styled from "@emotion/styled";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  Card,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Notification } from "app/components/toastNotification";
import { useAppDispatch } from "core/hooks/reduxHooks";
import { login } from "core/redux/slices/authSlice";
import { Validations } from "core/utils/validations";
import { useState } from "react";
import * as yup from "yup";

const Logo = styled(Card)`
  background-color: #ccc;
  flex: 1;
  height: 100%;
`;

const Login = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function togglePassword() {
    setShowPassword(!showPassword);
  }

  const handleLogin = async () => {
    try {
      await Validations.loginSchema.validate(
        { email, password },
        { abortEarly: false }
      );
      await dispatch(
        login({
          email,
          password,
        })
      );
    } catch (e) {
      // ? erro na validação
      if (e instanceof yup.ValidationError) {
        e.errors.map((erro) => Notification(erro, "error"));
      } else {
        // ? erro por fora
        console.error("Erro durante o login:", e);
      }
    }
  };

  return (
    <Container
      disableGutters
      sx={{
        background: "#fff",
        borderRadius: 1,
        height: "60vh",
        width: "60vw",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "100%",
          gap: 1,
        }}
      >
        <Logo sx={{ boxShadow: "none" }}></Logo>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            justifyContent: "center",
            flex: 1,
            height: "100%",
            padding: 2,
            gap: 3,
          }}
        >
          <Typography sx={{ fontSize: "1.5pc" }}>
            Acesso para colaboradores
          </Typography>
          <TextField
            required
            autoComplete="off"
            variant="standard"
            fullWidth
            id="email"
            label="E-mail"
            name="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            required
            autoComplete="off"
            variant="standard"
            fullWidth
            id="password"
            name="password"
            label="Senha"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={togglePassword}
                    //onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            sx={{
              background: "rgba(16, 175, 205, 1)",
              borderRadius: 10,
              fontWeight: "bold",
              fontSize: "1.2em",
              mt: 5,
            }}
            fullWidth
            variant="contained"
            onClick={handleLogin}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;

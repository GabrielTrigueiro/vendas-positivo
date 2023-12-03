import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Notification } from "app/components/toastNotification";
import { useAppDispatch } from "core/hooks/reduxHooks";
import { login } from "core/redux/slices/authSlice";
import { Validations } from "core/utils/validations";
import { useState } from "react";
import * as yup from "yup";
import Logo from "images/assets/logo.svg";

const Login = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const currentTheme = useTheme();
  const isSmallScreen = useMediaQuery(currentTheme.breakpoints.down("sm")); //bp width

  function togglePassword() {
    setShowPassword(!showPassword);
  }

  // * validation plus call login from redux
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
      // ? validation error
      if (e instanceof yup.ValidationError) {
        e.errors.map((erro) => Notification(erro, "error"));
      } else {
        // ? external error
        console.error("Erro durante o login:", e);
      }
    }
  };

  return (
    <Container
      maxWidth={isSmallScreen ? "sm" : "md"}
      disableGutters
      sx={{
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
        height: "55vh",
        background: "#fff",
        borderRadius: "10px",
        display: "flex",
        ...(isSmallScreen && {
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 2,
        }),
      }}
    >
      <Box
        sx={{
          background: `url(${Logo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: "10px 0px 0 10px",
          width: "50%",
          height: "100%",
          ...(isSmallScreen && {
            borderRadius: "10px",
            position: "absolute",
            height: 150,
            width: 150,
            top: "10%",
          }),
        }}
      ></Box>
      <Box
        sx={{
          width: "50%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
          padding: "0 1% ",
          gap: 1,
          ...(isSmallScreen && {
            justifyContent: "center",
            width: "100%",
            padding: 0,
            gap: 3,
          }),
        }}
      >
        <Typography sx={{ fontSize: "1.5pc", fontWeight: "bold" }}>
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
                  edge="end"
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          sx={{ fontWeight: "bold", borderRadius: 10 }}
          fullWidth
          variant="contained"
          onClick={handleLogin}
        >
          Login
        </Button>
        {/* <Link to="/registro">Não é registrado?</Link> */}
      </Box>
    </Container>
  );
};

export default Login;

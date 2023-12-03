import {
  Button,
  Container,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useFormik } from "formik";
import { Validations } from "core/utils/validations";
import { Notification } from "app/components/toastNotification";
import { useAppDispatch } from "core/hooks/reduxHooks";
import { register } from "core/redux/slices/authSlice";
import * as Yup from "yup";
import { useState } from "react";
import { Link } from "react-router-dom";

const ContainerLogin = styled(Container)`
  background: #fff;
  border-radius: 0.5em;
  height: 50%;
  width: 40%;
  padding: 1em 2em;
  display: flex;
`;

const BoxForm = styled("form")`
  height: 100%;
  width: 100%;
  display: flex;
  gap: 1em;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const SingOn = () => {
  const dispatch = useAppDispatch();
  const [pass, setPass] = useState("");
  const initialValues = {
    email: "",
    password: "",
    cpf: "",
    name: "",
    role: "ROLE_ADMIN",
  };

  const formik = useFormik({
    initialValues,
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting }) => {
      // * yup
      await Validations.registerSchema
        .validate(values, { abortEarly: false })
        // * passou no yup
        .then(async (values) => {
          try {
            await dispatch(register(values));
            formik.resetForm();
          } catch (e) {
            // ! erro externo
            Notification("Erro na conexão", "error");
            setSubmitting(false);
          }
        })
        // ! erros do yup
        .catch((e) => {
          if (Yup.ValidationError.isError(e)) {
            e.inner.forEach((validationError) => {
              Notification(validationError.message, "error");
            });
            setSubmitting(false);
          } else {
            console.error(e);
            setSubmitting(false);
          }
          setSubmitting(false);
        });
    },
  });

  return (
    <ContainerLogin disableGutters>
      <BoxForm onSubmit={formik.handleSubmit}>
        <Typography sx={{ fontSize: "1.5pc", fontWeight: "bold" }}>
          Registro de colaboradores
        </Typography>
        <TextField
          autoComplete="off"
          variant="standard"
          fullWidth
          id="name"
          label="Nome"
          name="name"
          autoFocus
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        <TextField
          autoComplete="off"
          variant="standard"
          fullWidth
          id="cpf"
          label="CPF"
          name="cpf"
          autoFocus
          value={formik.values.cpf}
          onChange={formik.handleChange}
        />
        <TextField
          autoComplete="off"
          variant="standard"
          fullWidth
          id="email"
          label="E-mail"
          name="email"
          autoFocus
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <TextField
          autoComplete="off"
          variant="standard"
          fullWidth
          label="Senha"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <TextField
          autoComplete="off"
          variant="standard"
          fullWidth
          label="Confirmar senha"
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <Button
          type="submit"
          sx={{ fontWeight: "bold", borderRadius: 10 }}
          variant="contained"
        >
          Registrar
        </Button>
        <Link to="/login">Já é registrado?</Link>
      </BoxForm>
    </ContainerLogin>
  );
};

export default SingOn;

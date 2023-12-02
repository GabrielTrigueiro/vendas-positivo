import * as yup from "yup";

const loginSchema = yup.object({
  email: yup.string().required("Digite o email"),
  password: yup
    .string()
    .min(5, "Senha deve ter ao menos 5 digitos")
    .required("Digite a senha"),
});

export const Validations = {
  loginSchema,
};

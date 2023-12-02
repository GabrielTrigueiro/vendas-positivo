import * as yup from "yup";

const loginSchema = yup.object({
  email: yup.string().required("Digite o email"),
  password: yup
    .string()
    .min(5, "Senha deve ter ao menos 5 digitos")
    .required("Digite a senha"),
});

const registerSchema = yup.object({
  name: yup.string().required("Digite o nome"),
  email: yup.string().email("E-mail inválido").required("Digite o email"),
  cpf: yup.string().required("Digite o cpf"),
  role: yup.string().required("Escolha uma role"),
  password: yup
    .string()
    .min(5, "Senha deve ter ao menos 5 digitos")
    .required("Digite a senha"),
});

export const Validations = {
  loginSchema,
  registerSchema,
};

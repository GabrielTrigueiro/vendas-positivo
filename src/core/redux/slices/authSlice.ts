import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Notification } from "app/components/toastNotification";
import axiosInstance from "core/api/axiosInstance";
import { AUTH, REGISTER } from "core/utils/constants";
import { JwtPayload, jwtDecode } from "jwt-decode";

type User = {
  email: string;
  password: string;
};

type NewUser = {
  email: string;
  password: string;
  cpf: string;
  name: string;
  role: string;
};

type UserBasicInfo = {
  name: string;
  email: string;
  roles: string[];
};

type AuthApiState = {
  basicUserInfo?: UserBasicInfo | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
};

interface CustomJwtPayload extends JwtPayload {
  email: string;
  name: string;
  roles: [];
}

const translateToken = (token: string | null): UserBasicInfo | null => {
  if (token === null) {
    return null;
  }
  let userDecoded: CustomJwtPayload = jwtDecode(token);
  let user = {
    email: userDecoded.sub || "",
    name: userDecoded.name,
    roles: userDecoded.roles,
  };
  return user;
};

const initialState: AuthApiState = {
  basicUserInfo: localStorage.getItem("userInfo")
    ? translateToken(localStorage.getItem("userInfo"))
    : null,
  status: "idle",
  error: null,
};

// * login + token L.S.
export const login = createAsyncThunk("login", async (data: User) => {
  const response = await axiosInstance
    .post(AUTH, data)
    .then((resp) => {
      localStorage.setItem("userInfo", resp.data.data);
      Notification("Login bem sucedido", "success");
      return resp.data.data;
    })
    .catch((err: any) => {
      Notification(err.response?.data?.errors[0], "error");
      return err;
    });
  return response;
});

// ! falta testar e ver se ta registrando e logando direto
export const register = createAsyncThunk("register", async (data: NewUser) => {
  const response = await axiosInstance
    .post(REGISTER, data)
    .then((resp) => {
      localStorage.setItem("userInfo", resp.data.data);
      Notification("Registrado com sucesso", "success");
      return resp.data.data;
    })
    .catch((err: any) => {
      Notification(err.response?.data?.errors[0], "error");
      return err;
    });
  return response;
});

export const logout = createAsyncThunk("logout", async () => {
  localStorage.removeItem("userInfo");
});

// ? resgatar usuário do local storage
export const getUser = () => {
  try {
    const serializedUser = localStorage.getItem("userInfo");
    if (serializedUser === null) {
      return undefined;
    }
    return jwtDecode(serializedUser);
  } catch (err: any) {
    console.log(err);
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = "idle";
        state.basicUserInfo = translateToken(action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Login failed";
      })
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = "idle";
        state.basicUserInfo = translateToken(action.payload);
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Registration failed";
      });
  },
});

export default authSlice.reducer;

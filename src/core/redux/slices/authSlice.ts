import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "core/api/axiosInstance";
import { AUTH } from "core/utils/constants";
import { jwtDecode } from "jwt-decode";

type User = {
  email: string;
  password: string;
};

// type NewUser = User & {
//   name: string;
// };

type UserBasicInfo = {
  id: string;
  name: string;
  email: string;
  token: string;
};

type UserProfileData = {
  name: string;
  email: string;
};

type AuthApiState = {
  basicUserInfo?: UserBasicInfo | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
};

const translateToken = (token: string | null): UserBasicInfo | null => {
  if (token === null) {
    return null;
  }
  let userDecoded = jwtDecode(token);
  let user = {
    email: userDecoded.sub || "",
    id: "não tem por enquanto",
    name: "não tem por enquanto",
    token: token,
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

// * req - dec token - salvando local storage
export const login = createAsyncThunk("login", async (data: User) => {
  const response = await axiosInstance.post(AUTH, data);
  const resData = response.data.data;
  console.log(resData.data);
  localStorage.setItem("userInfo", resData);
  return resData;
});

// export const register = createAsyncThunk("register", async (data: NewUser) => {
//   const response = await axiosInstance.post("/register", data);
//   const resData = response.data;
//   localStorage.setItem("userInfo", JSON.stringify(resData));
//   return resData;
// });

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
      });

    // .addCase(register.pending, (state) => {
    //   state.status = "loading";
    //   state.error = null;
    // })
    // .addCase(
    //   register.fulfilled,
    //   (state, action: PayloadAction<UserBasicInfo>) => {
    //     state.status = "idle";
    //     state.basicUserInfo = action.payload;
    //   }
    // )
    // .addCase(register.rejected, (state, action) => {
    //   state.status = "failed";
    //   state.error = action.error.message || "Registration failed";
    // })
  },
});

export default authSlice.reducer;

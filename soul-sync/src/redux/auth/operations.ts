import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export interface User {
  email: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface RegisterBody {
  email: string;
  password: string;
}

export interface LoginBody {
  email: string;
  password: string;
}

export const api = axios.create({
  baseURL: "https://connections-api.goit.global/",
});

const setAuthAppBar = (token: string) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const registerThunk = createAsyncThunk<
  AuthResponse, 
  RegisterBody, 
  { rejectValue: string } 
>("auth/register", async (body, thunkAPI) => {
  try {
    const { data } = await api.post<AuthResponse>("/users/signup", body);
    setAuthAppBar(data.token);
    return data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const loginThunk = createAsyncThunk<
  AuthResponse,
  LoginBody,
  { rejectValue: string }
>("auth/login", async (body, thunkAPI) => {
  try {
    const { data } = await api.post<AuthResponse>("/users/login", body);
    setAuthAppBar(data.token);
    return data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const logOut = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await api.post("users/logout");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshUser = createAsyncThunk<
  User,
  void,
  { rejectValue: string; state: { auth: { token: string | null } } }
>("auth/refresh", async (_, thunkAPI) => {
  try {
    const savedToken = thunkAPI.getState().auth.token;
    if (savedToken === null) {
      return thunkAPI.rejectWithValue("Token is not exist");
    }
    setAuthAppBar(savedToken);
    const { data } = await api.get<User>("users/current");
    return data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return thunkAPI.rejectWithValue(error.message);
  }
});

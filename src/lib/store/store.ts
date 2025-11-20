import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import AuthService from "../services/AuthService";
import axios from "axios";
import { MoodResponse } from "../models/response/MoodResponse";
import MoodService from "../services/MoodService";
import { toast } from "react-toastify";

export default class Store {
  user = {} as IUser;
  isAuth = false;
  mood = {} as MoodResponse;
  loginModalOpen = false;
  registrationModalOpen = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }
  setUser(user: IUser) {
    this.user = user;
  }
  setMood(mood: MoodResponse) {
    this.mood = mood;
  }
  setLoginModalOpen(bool: boolean) {
    this.loginModalOpen = bool;
  }
  setRegistrationModalOpen(bool: boolean) {
    this.registrationModalOpen = bool;
  }
  setIsLoading(bool: boolean) {
    this.isLoading = bool;
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      toast.success("Successfully logged in!");
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data?.message || "Login failed.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  }

  async registration(email: string, password: string) {
    try {
      const response = await AuthService.registration(email, password);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      toast.success("Registration successful!");
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data?.message || "Registration failed.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  }

  async logout() {
    try {
      const response = await AuthService.logout();
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({} as IUser);
      toast.info("You have been logged out.");
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error("Logout failed.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  }

  async sendMood(text: string) {
    try {
      const response = await MoodService.sendMood(text);
      const mood: MoodResponse = response.data;
      this.setMood(mood);
      toast.success("Mood sent successfully!");
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error("Failed to send mood.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  }

  async checkAuth() {
    this.setIsLoading(true);
    try {
      const response = await AuthService.refresh();
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (error) {
      this.setAuth(false);
      this.setUser({} as IUser);
      localStorage.removeItem("token");
    } finally {
      this.setIsLoading(false);
    }
  }
}

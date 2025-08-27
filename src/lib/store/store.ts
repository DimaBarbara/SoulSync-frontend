import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import AuthService from "../services/AuthService";
import axios from "axios";
import { MoodResponse } from "../models/response/MoodResponse";
import MoodService from "../services/MoodService";
import { AuthResponse } from "../models/response/AuthResponse";
import { API_URL } from "../utils/api";

export default class Store {
    user = {} as IUser;
    isAuth = false;
    mood = {} as MoodResponse;
    loginModalOpen = false;
    registrationModalOpen = false;


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
        this.mood = mood
    }
    setLoginModalOpen(bool: boolean) {
    this.loginModalOpen = bool;
    }
    setRegistrationModalOpen(bool: boolean) {
        this.registrationModalOpen = bool;
    }

    async login(email: string, password:string) {
        try {
            const response = await AuthService.login(email, password);
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true)
            this.setUser(response.data.user)
            console.log(this.isAuth)
        } catch (error: unknown) {
             if (axios.isAxiosError(error) && error.response) {
            console.log(error.response.data?.message);
        } else {
            console.log('Unexpected error', error);
        }
        }
    }
    
    async registration(email: string, password:string) {
        try {
            const response = await AuthService.registration(email, password);
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (error: unknown) {
             if (axios.isAxiosError(error) && error.response) {
            console.log(error.response.data?.message);
        } else {
            console.log('Unexpected error', error);
        }
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout();
            console.log(response)
            localStorage.removeItem('token');
            this.setAuth(false)
            this.setUser({} as IUser)
        } catch (error: unknown) {
             if (axios.isAxiosError(error) && error.response) {
            console.log(error.response.data?.message);
        } else {
            console.log('Unexpected error', error);
        }
        }
    }

    async sendMood(text: string) {
        try {
            const response = await MoodService.sendMood(text);
            console.log(response)
            const mood: MoodResponse = response.data;        
            this.setMood(mood);
        } catch (error: unknown) {
             if (axios.isAxiosError(error) && error.response) {
            console.log(error.response.data?.message);
        } else {
            console.log('Unexpected error', error);
        }
        }
    }

    async checkAuth() {
        try {
            const response = await AuthService.refresh()
            console.log("frfrfr",response)
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (error: unknown) {
             if (axios.isAxiosError(error) && error.response) {
            console.log("D",error.response.data.data?.message);
        } else {
            console.log('Unexpected error', error);
        }
        }
    }
}
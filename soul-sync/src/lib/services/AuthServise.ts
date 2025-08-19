import { AxiosResponse } from "axios";
import $api from "../api";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<> {
        return $api.post()

    }
}
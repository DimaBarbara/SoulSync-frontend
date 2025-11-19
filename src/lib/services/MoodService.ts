import { AxiosResponse } from "axios";
import { MoodResponse } from "../models/response/MoodResponse";
import $api from "../utils/api";

export default class MoodService {
  static async sendMood(text: string): Promise<AxiosResponse<MoodResponse>> {
    return $api.post<MoodResponse>("/mood", { text });
  }
}

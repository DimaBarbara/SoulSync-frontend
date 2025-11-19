import { Emotion } from "../Emotion";

export interface MoodResponse {
  userId: string;
  text: string;
  emotions: Emotion[];
  advice: string;
  _id: string;
  date: string;
  __v: number;
}

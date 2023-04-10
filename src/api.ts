import axios from "axios";

export const BASE_PATH = "http://192.168.163.20:8080";

export interface IVideo {
  id: number;
  title: string;
  overview: string;
  bgPath: string;
  posterPath: string;
  videoPath: string;
}

export function getVideos(): Promise<IVideo[]> {
  return axios.get(`${BASE_PATH}/videos/get`).then((res) => shuffle(res.data));
}

function shuffle(array: IVideo[]) {
  array.sort(() => Math.random() - 0.5);
  return array;
}

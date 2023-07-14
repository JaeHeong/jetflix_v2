import axios from "axios";

export const BASE_PATH = "http://192.168.163.20:8080";
export const FILE_API_URL =
  "https://duvd9ld2ab.execute-api.ap-northeast-2.amazonaws.com/prod/file-upload";
export const DB_API_URL =
  "https://duvd9ld2ab.execute-api.ap-northeast-2.amazonaws.com/prod/db-upload";

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

export async function searchVideos(keyword: string, setVideoList: any) {
  if (keyword)
    /*remove if(keyword), then search "  " => show all videos, For test*/
    return await axios
      .get(`${BASE_PATH}/videos/get/${keyword.split(" ").join("")}`)
      .then((res) => setVideoList(res.data))
      .catch((error) => console.log(error));
}

export function deleteVideo(id: number) {
  return axios.get(`${BASE_PATH}/videos/delete/${id}`);
}

function shuffle(array: IVideo[]) {
  array.sort(() => Math.random() - 0.5);
  return array;
}

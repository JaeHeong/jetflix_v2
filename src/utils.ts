const BASE_PATH = "http://192.168.163.20:8080";

export function makeBgPath(id: number) {
  return `${BASE_PATH}/images/bg/${id}`;
}

export function makePosterPath(id: number) {
  return `${BASE_PATH}/images/poster/${id}`;
}

export function makePlayPath(id: number) {
  return `${BASE_PATH}/videos/play/${id}`;
}

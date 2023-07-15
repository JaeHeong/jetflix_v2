const BASE_PATH = "https://d1bug73j39exox.cloudfront.net";

export function makeBgPath(id: number) {
  return `${BASE_PATH}/${id}/bg.jpeg`;
}

export function makePosterPath(id: number) {
  return `${BASE_PATH}/${id}/post.jpeg`;
}

export function makePlayPath(id: number) {
  return `${BASE_PATH}/${id}/pv.mp4`;
}

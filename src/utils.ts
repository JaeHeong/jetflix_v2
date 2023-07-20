const IMAGE_PATH = "https://d1bug73j39exox.cloudfront.net";
const VIDEO_PATH = "https://d2igobqzh8tss5.cloudfront.net";

export function makeBgPath(id: number) {
  return `${IMAGE_PATH}/${id}/bg.jpeg`;
}

export function makePosterPath(id: number) {
  return `${IMAGE_PATH}/${id}/post.jpeg`;
}

export function makePlayBgPath(id: number) {
  return `${IMAGE_PATH}/${id}/pv.mp4`;
}

export function makePlayPath(id: number) {
  return `${VIDEO_PATH}/${id}/pv.m3u8`;
}

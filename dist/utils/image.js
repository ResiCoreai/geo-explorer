import { request } from "../utils/request";
export async function getImageBlobUrl(config) {
  const { data: blob } = await request({
    ...config,
    responseType: "blob",
  });
  return URL.createObjectURL(blob);
}

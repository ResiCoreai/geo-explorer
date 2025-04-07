import { AxiosRequestConfig } from "axios";

import { request } from "@ncsa/geo-explorer/utils/request";

export async function getImageBlobUrl(
  config: AxiosRequestConfig,
): Promise<string> {
  const { data: blob } = await request<Blob>({
    ...config,
    responseType: "blob",
  });
  return URL.createObjectURL(blob);
}

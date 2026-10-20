import HttpService from "./http-service";

// This is for ShortenLink
export interface Data {
  shortCode: string;
  originalUrl: string;
  shortUrl: string;
  user: string;
}

interface BackendData {
  link: string;
}

export const shortenLinksService = new HttpService<Data, BackendData>(
  "/api/links",
);

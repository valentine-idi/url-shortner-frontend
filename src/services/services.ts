import HttpService from "./http-service";

//Error
export interface ApiError {
  message: string;
}

// This is for ShortenLink
export interface Data {
  shortCode: string;
  originalUrl: string;
  shortUrl: string;
  user: string;
}

export interface BackendPostData {
  link: string;
}

export const shortenLinksService = new HttpService<Data>("/api/links");

//interface for userLoginService
interface User {
  id: string;
  email: string;
}

export interface CurrentUser {
  user: User;
  token: string;
}

interface UserLoginResponse {
  user: User;
  token: string;
}

export interface UserPostData {
  email: string;
  password: string;
}

export const userLoginService = new HttpService<UserLoginResponse>(
  "/api/users/login",
);

import HttpService from "./http-service";
import { publicClient } from "./apiClient";

//Error
export interface ApiError {
  message: string;
}

// This is for ShortenLink
export interface LinksServiceResponse {
  id: string;
  shortCode: string;
  originalUrl: string;
  shortUrl: string;
  userId?: string;
}

export interface BackendPostData {
  link: string;
}

export const linksService = new HttpService("/api/links");

//interface for userLoginService
interface User {
  id: string;
  email: string;
}

export interface CurrentUser {
  user: User;
  token: string;
}

export interface UserLoginResponse {
  user: User;
  token: string;
}

export interface UserPostData {
  email: string;
  password: string;
}

export const userLoginService = new HttpService(
  "/api/users/login",
  publicClient,
);

//userRegisterServivce
export interface RegisterPostData extends UserPostData {
  name: string;
}

export interface UserRegisterResponse extends UserPostData {
  id: string;
}

export const userRegisterService = new HttpService(
  "/api/users/register",
  publicClient,
);

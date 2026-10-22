import apiClient from "./apiClient";

export default class HttpService<T, U = void> {
  private readonly url: string;

  constructor(url: string) {
    this.url = url;
  }

  post(data: U) {
    return apiClient.post<T>(this.url, data);
  }
}

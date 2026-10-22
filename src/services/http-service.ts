import apiClient from "./apiClient";

export default class HttpService<T> {
  private readonly url: string;

  constructor(url: string) {
    this.url = url;
  }

  post<U>(data: U) {
    return apiClient.post<T>(this.url, data);
  }
}

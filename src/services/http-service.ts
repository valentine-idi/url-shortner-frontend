import apiClient from "./apiClient";

export default class HttpService {
  private readonly url: string;

  constructor(url: string) {
    this.url = url;
  }

  get<TRes>() {
    return apiClient.get<TRes>(this.url);
  }

  post<TReq, TRes>(data: TReq) {
    return apiClient.post<TRes>(this.url, data);
  }
}

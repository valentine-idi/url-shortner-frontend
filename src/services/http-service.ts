import apiClient, { type AxiosInstance } from "./apiClient";

export default class HttpService {
  private readonly url: string;
  private readonly client: AxiosInstance;

  constructor(url: string, client: AxiosInstance = apiClient) {
    this.url = url;
    this.client = client;
  }

  get<TRes>() {
    return this.client.get<TRes>(this.url);
  }

  post<TReq, TRes>(data: TReq) {
    return this.client.post<TRes>(this.url, data);
  }
}

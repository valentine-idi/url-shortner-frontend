import axios from "axios";

export { isAxiosError } from "axios";

const currentUser = sessionStorage.getItem("currentUser");

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    ...(currentUser && {
      Authorization: `Bearer ${JSON.parse(currentUser).token}`,
    }),
  },
});

export function setAuthToken(token: string | undefined) {
  if (token)
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  else delete apiClient.defaults.headers.common.Authorization;
}

export default apiClient;

import axios from "axios";

export { isAxiosError } from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// apiClient.interceptors.request.use((config) => {
//   const savedUser = sessionStorage.getItem("currentUser");
//   const currenUser = savedUser ? JSON.parse(savedUser) : null;

//   if (currenUser.token)
//     config.headers.set("Authorization", `Bearer ${currenUser.token}`);
//   else config.headers.delete("Authorization");

//   return config;
// });

export function setAuthToken(token: string | undefined) {
  if (token)
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  else delete apiClient.defaults.headers.common.Authorization;
}

export default apiClient;

import { useAuthData } from "../store/auth.store";
import { ROUTES } from "../routes/routes";
import axios, { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";

const handleTopLevelError = (error: AxiosError) => {
  const responseData = error?.response?.data as any;
  if (responseData?.message) {
    if (typeof responseData?.message === "string") {
      toast.error(responseData?.message);
    } else {
      toast.error(responseData?.message[0]);
    }
  }
};

function errorHandler(error: AxiosError) {
  const { setAccessToken } = useAuthData.getState();
  console.warn(error);

  //FORBIDDEN
  if (error.response?.status === 403) {
    setAccessToken({ access_token: null });

    window.location.href = ROUTES.auth.login;
  }

  // UNAUTHORIZED
  if (error.response?.status === 401) {
    setAccessToken({ access_token: null });

    if (window.location.pathname !== ROUTES.auth.login) {
      window.location.href = ROUTES.auth.login;
    }
  }
  handleTopLevelError(error);

  throw error;
}

const SWAPI_API_URL = import.meta.env.VITE_PUBLIC_SWAPI_API_URL;

export const apiClient = axios.create({
  baseURL: SWAPI_API_URL,
});

apiClient.interceptors.request.use((config) => {
  const { headers } = config;
  const { authData } = useAuthData.getState();

  if (authData && authData.access_token) {
    headers.Authorization = `Bearer ${authData.access_token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data?.success === false) {
      if (response?.data?.data?.message) {
        toast.error(response?.data?.data?.message);
      }
    }

    return response;
  },
  (error: AxiosError) => {
    console.error(error);
    errorHandler(error);
  }
);

import { apiClient } from "../../../utils/axios.interceptor";
import { IHomeworld } from "../interfaces/homeworld.interface";

export const getHomeWorldById = async (
  id: string
): Promise<IHomeworld | null> => {
  if (id) {
    const { data } = await apiClient.get(`/planets/${id}`);
    return data;
  }

  return null;
};

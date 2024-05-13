import { apiClient } from "../../../utils/axios.interceptor";
import {
  IStarship,
  IStarshipResponseDto,
} from "../interfaces/starship.interface";

export const getAllStarShips = async (): Promise<IStarshipResponseDto> => {
  const { data } = await apiClient.get("/starships");
  return data;
};

export const getStarShipById = async (
  id: string
): Promise<IStarship | null> => {
  if (id) {
    const { data } = await apiClient.get(`/starships/${id}`);
    return data;
  }
  return null;
};

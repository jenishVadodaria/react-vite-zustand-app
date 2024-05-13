import { apiClient } from "../../../utils/axios.interceptor";
import {
  IPeople,
  IPeopleResponseDto,
  IQueryParams,
} from "../interfaces/people.interface";

export const getAllPeople = async (
  payload: IQueryParams
): Promise<IPeopleResponseDto> => {
  const { data } = await apiClient.get<IPeopleResponseDto>(`/people?`, {
    params: {
      ...payload,
    },
  });

  return data;
};

export const getPeopleById = async (id: string): Promise<IPeople | null> => {
  if (id) {
    const { data } = await apiClient.get(`/people/${id}`);
    return data;
  }

  return null;
};

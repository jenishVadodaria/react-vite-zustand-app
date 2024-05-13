import { apiClient } from "../../../utils/axios.interceptor";
import { IFilm, IFilmResponseDto } from "../interfaces/film.interface";

export const getAllFilms = async (): Promise<IFilmResponseDto> => {
  const { data } = await apiClient.get("/films");
  return data;
};
export const getFilmById = async (id: string): Promise<IFilm | null> => {
  if (id) {
    const { data } = await apiClient.get(`/films/${id}`);
    return data;
  }

  return null;
};

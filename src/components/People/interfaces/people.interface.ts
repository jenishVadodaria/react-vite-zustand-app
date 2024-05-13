export interface IPeople {
  name: string;
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  mass: string;
  skin_color: string;
  homeworld: string;
  films: string[];
  species: string[];
  starships: string[];
  vehicles: string[];
  url: string;
  created: string;
  edited: string;
  [key: string]: string | string[] | number;
}

export interface IPeopleResponseDto {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPeople[];
}

export interface IQueryParams {
  page?: number;
  search?: string;
}

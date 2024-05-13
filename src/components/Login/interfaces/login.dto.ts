export interface ILoginRequestDto {
  email: string;
  password: string;
}

export interface ILoginResponseDto {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
  profile_picture: string;
  access_token: string;
  created_at?: Date;
  updated_at?: Date;
}

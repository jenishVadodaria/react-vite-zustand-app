import { ILoginRequestDto, ILoginResponseDto } from "../interfaces/login.dto";
import userData from "../../../data/user-data.json";

export const login = async (
  payload: ILoginRequestDto
): Promise<ILoginResponseDto> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = userData.users.find(
        (user) =>
          user.email === payload.email && user.password === payload.password
      );
      if (user) {
        resolve({
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          password: user.password,
          phone_number: user.phone_number,
          profile_picture: user.profile_picture,
          access_token: user.access_token,
        });
      } else if (!user) {
        reject("Invalid credentials");
      } else {
        reject("Something went wrong!");
      }
    }, 1000);
  });
};

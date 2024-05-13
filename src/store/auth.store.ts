import { produce } from "immer";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { IUserResponseDto } from "../interfaces/auth.dto";

type TAuthData = {
  access_token: string | null;
};

type TAuthStore = {
  authData: TAuthData;
  user: IUserResponseDto | null;
};

type Actions = {
  setAuthData: (payload: TAuthStore) => void;
  setAccessToken: (payload: TAuthData) => void;
};

const INITIAL_STATE = {
  authData: {
    access_token: null,
  },
  user: null,
};

export const useAuthData = create<TAuthStore & Actions>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,
      setAuthData: (payload: TAuthStore) => {
        set((state) =>
          produce(state, (draft) => {
            draft.authData = payload.authData;
            draft.user = payload.user;
          })
        );
      },
      setAccessToken: (payload: TAuthData) => {
        set(
          produce((state) => {
            state.authData.access_token = payload.access_token;
          })
        );
      },
    }),
    {
      name: "auth-token",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

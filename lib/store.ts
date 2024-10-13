import { create } from "zustand";
import { ShopType, userNameType, UserType } from "../types";

// username
interface userNameStore {
  username: userNameType;
  setUsername: (username: userNameType) => void;
}

export const useUserNameStore = create<userNameStore>((set) => ({
  username: null,
  setUsername: (username: userNameType) => set({ username }),
}));

// shop
interface shopStore {
  shop: ShopType | null;
  setShop: (shop: ShopType | null) => void;
}

export const useShopStore = create<shopStore>((set) => ({
  shop: null,
  setShop: (shop: ShopType | null) => set({ shop }),
}));

interface userStore {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
}

export const useUserStore = create<userStore>((set) => ({
  user: null,
  setUser: (user: UserType | null) => set({ user }),
}));

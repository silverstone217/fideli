export interface ShopType {
  id: string;
  name: string;
  address: string;
}

export type userNameType = string | null | undefined;

export interface UserType {
  id: string;
  username: string;
  phone: string;
  createdAt: number;
}

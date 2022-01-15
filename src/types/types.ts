export type Photo = {
  small: string | null;
  large: string | null;
};


export type UserType = {
  id: number;
  name: string;
  status: string;
  photos: Photo;
  followed: boolean;
};

export interface IProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  averageRating: number;
}

export const products: IProduct[] = [];

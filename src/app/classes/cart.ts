export class Cart {
  user_id!: string;
  contents!: { product_id: string, quantity: number }[];
}
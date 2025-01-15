export class Order {
    buyer_id!: string;
    seller_id!: string;
    product_id?: string;
    description?: string;
    price?: number;
    quantity!: number;
    address!: string;
    status!: string;
    type!: string;
}
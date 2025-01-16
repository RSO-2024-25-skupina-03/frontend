export class Order {
    _id?: string;
    buyer_id!: string;
    seller_id!: string;
    product_id?: string;
    description?: string;
    price?: number;
    quantity!: number;
    date?: string;
    address!: string;
    status!: string;
    type!: string;
}
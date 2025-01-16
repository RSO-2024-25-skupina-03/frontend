export interface Product {
    product_id: string,
    seller_id: string,
    name: string,
    price: number,
    description: string,
    image_b64: string,
    stock?: number,
    seller_name?: string,
}

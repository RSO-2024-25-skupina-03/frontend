export default class OrderResponse {
    order!: {
        buyerId: string;
        sellerId: string;
        productId: string;
        description: string;
        price: number;
        quantity: number;
        address: string;
        status: string;
        type: string;
    };
    message!: {
        status: string,
        type: string,
        message: {
            order_id: string,
            buyer_id: string,
            seller_id: string,
            time: Date
        }
    };
}
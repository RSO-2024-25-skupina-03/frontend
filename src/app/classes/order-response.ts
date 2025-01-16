export default class OrderResponse {
    order!: {
        _id: string,
        buyer_id: string,
        seller_id: string,
        product_id: string,
        description: string,
        price: number,
        quantity: number,
        date: string,
        address: string,
        status: string,
        type: string
    };
    message!: {
        status: string,
        type: string,
        message: {
            order_id: string,
            buyer_id: string,
            seller_id: string,
            time: string
        }
    };
};
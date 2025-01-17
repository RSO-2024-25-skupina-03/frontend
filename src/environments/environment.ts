// const domain = 'http://4.182.90.110.nip.io';
const domain = 'http://localhost';
export const environment = {
    production: true,
    cartServiceUrl: domain + '/api/cart',
    stockServiceUrl: domain + '/api/stock',
    ordersServiceUrl: domain + '/api/orders',
    authenticationServiceUrl: domain + '/api/authentication',
    notificationsUrl: domain + '/api/notifications',
};
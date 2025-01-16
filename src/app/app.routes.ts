import { Routes } from '@angular/router';
import { ShopComponent } from './components/shop/shop.component';
import { DetailsComponent } from './components/details/details.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { RegisterComponent } from './components/register/register.component';
import { CustomOrderComponent } from './components/custom-order/custom-order.component';
import { FirstPageComponent } from './components/first-page/first-page.component';
import { FrameworkComponent } from './components/framework/framework.component';
import { TenantSelectionLayoutComponent } from './components/tenant-selection-layout/tenant-selection-layout.component';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { OrderComponent } from './components/order/order.component';

const routeConfig: Routes = [
    {
        path: '',
        component: TenantSelectionLayoutComponent,
        children: [
            {
                path: '',
                component: FirstPageComponent,
                title: 'Select Tenant',
            }
        ]
    },
    {
        path: ':tenant',
        component: FrameworkComponent,
        children: [
            {
                path: '',
                component: ShopComponent,
                title: 'Shop',
            },
            {
                path: 'details/:id',
                component: DetailsComponent,
                title: 'About',
            },
            {
                path: 'cart',
                component: CartComponent,
                title: 'Cart',
            },
            {
                path: 'login',
                component: LoginComponent,
                title: 'Login',
            },
            {
                path: 'checkout',
                component: CheckoutComponent,
                title: 'Checkout',
            },
            {
                path: 'register',
                component: RegisterComponent,
                title: 'Register',
            },
            {
                path: 'custom-order/:id',
                component: CustomOrderComponent,
                title: 'Custom Order',
            },
            {
                path: 'orders',
                component: OrdersListComponent,
                title: 'Orders',
            },
            {
                path: 'order-details/:id',
                component: OrderComponent,
                title: 'Order Details',
            }
        ]
    }
];
export default routeConfig;
import { Routes } from '@angular/router';
import { ShopComponent } from './components/shop/shop.component';
import { DetailsComponent } from './components/details/details.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { RegisterComponent } from './components/register/register.component';
import { CustomOrderComponent } from './components/custom-order/custom-order.component';

const routeConfig: Routes = [
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
    }
];
export default routeConfig;
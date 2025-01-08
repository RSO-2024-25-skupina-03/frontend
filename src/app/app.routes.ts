import { Routes } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { DetailsComponent } from './details/details.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routeConfig: Routes = [
    {
        path: '',
        component: ShopComponent,
        title: 'Glavna stran',
    },
    {
        path: 'details/:id',
        component: DetailsComponent,
        title: 'O izdelku',
    },
    {
        path: 'cart',
        component: CartComponent,
        title: 'Košarica',
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Prijava',
    },
    {
        path: 'checkout',
        component: CheckoutComponent,
        title: 'Plačilo',
    }
];
export default routeConfig;
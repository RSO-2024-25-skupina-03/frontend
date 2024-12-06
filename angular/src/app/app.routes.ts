import { Routes } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { DetailsComponent } from './details/details.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';

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
    }
];
export default routeConfig;
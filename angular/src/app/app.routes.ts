import { Routes } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { DetailsComponent } from './details/details.component';

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
];
export default routeConfig;
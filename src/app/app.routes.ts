import {Routes} from '@angular/router';
import {LoginComponent} from "./component/login/login.component";
import {RegisterComponent} from "./component/register/register.component";
import {HomeComponent} from "./component/home/home.component";
import {ProductFormComponent} from "./component/product-form/product-form.component";
import {adminGuard} from "./guard/admin.guard";
import {notLoggedInGuard} from "./guard/not-logged-in.guard";
import {CartComponent} from "./component/cart/cart.component";
import {ProductComponent} from "./component/product/product.component";
import {ProductListComponent} from "./component/product-list/product-list.component";
import {OrderHistoryComponent} from "./component/order-history/order-history.component";
import {loggedInGuard} from "./guard/logged-in.guard";
import {OrderDetailsComponent} from "./component/order-details/order-details.component";
import {ProductTypeFormComponent} from "./component/product-type-form/product-type-form.component";

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [notLoggedInGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [notLoggedInGuard] },
  { path: 'create-product', component: ProductFormComponent, canActivate: [adminGuard] },
  { path: 'edit-product/:id', component: ProductFormComponent, canActivate: [adminGuard]  },
  { path: 'product/:id', component: ProductComponent },
  { path: 'product' , component: ProductListComponent},
  { path: 'cart', component: CartComponent, canActivate: [loggedInGuard] },
  { path: 'order', component: OrderHistoryComponent, canActivate: [loggedInGuard] },
  { path: 'order/:id', component: OrderDetailsComponent, canActivate: [loggedInGuard] },
  { path: 'create-product-type', component: ProductTypeFormComponent, canActivate: [adminGuard] },
  { path: '**', redirectTo: '/home' }
];

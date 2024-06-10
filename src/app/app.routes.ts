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

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [notLoggedInGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [notLoggedInGuard] },
  { path: 'create-product', component: ProductFormComponent, canActivate: [adminGuard] },
  { path: 'edit-product/:id', component: ProductFormComponent, canActivate: [adminGuard]  },
  { path: 'product/:id', component: ProductComponent },
  { path: 'product' , component: ProductListComponent},
  { path: 'cart', component: CartComponent }
];

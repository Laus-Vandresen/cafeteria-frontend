import { NewOrderComponent } from './views/new-order/new-order.component';
import { NewProductComponent } from './views/new-product/new-product.component';
import { OrderComponent } from './views/order/order.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './views/product/product.component';

const routes: Routes = [{
  path: "products",
  component: ProductComponent
},
{
  path: "orders",
  component: OrderComponent
},
{
  path: "new-product",
  component: NewProductComponent
},
{
  path: "new-order",
  component: NewOrderComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

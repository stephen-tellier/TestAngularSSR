import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListClientComponent } from './product-list-client.component';

const routes: Routes = [
  { path: '', component: ProductListClientComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductListClientRoutingModule { }

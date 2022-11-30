import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductListClientRoutingModule } from './product-list-client-routing.module';
import { ProductListClientComponent } from './product-list-client.component';
import { ProductListService } from '../../product-list/product-list.service';


@NgModule({
  declarations: [
    ProductListClientComponent
  ],
  imports: [
    CommonModule,
    ProductListClientRoutingModule
  ],
  providers: [
    ProductListService
  ],
})
export class ProductListClientModule { }

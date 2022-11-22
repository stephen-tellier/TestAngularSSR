import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductListRoutingModule } from './product-list-routing.module';
import { ProductListComponent } from './product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductListService } from './product-list.service';


@NgModule({
  declarations: [
    ProductListComponent
  ],
  imports: [
    CommonModule,
    ProductListRoutingModule,
    HttpClientModule
  ],
  providers: [
    ProductListService
  ],
})
export class ProductListModule { }

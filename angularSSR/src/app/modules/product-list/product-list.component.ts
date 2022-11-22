import { Component, OnInit } from '@angular/core';
import { ProductListService } from './product-list.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit{
  
  db: any;
  loaded: boolean;
  constructor(
    private productListService: ProductListService) {
    this.loaded = false;
  }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList(): void {
    this.loaded = false;
    this.productListService.getItems('https://my-json-server.typicode.com/stephen-tellier/TestAngularSSR/db')
      .subscribe(
        db => {
          this.db = db;
          this.loaded = true;
          console.log(db);
          
        });
  }

}

import { ProductItemContainerVM } from './../../Model/product-item-container-vm';
import { isPlatformBrowser } from '@angular/common';
import { APP_ID, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ProductItemVm } from 'src/app/Model/product-item-vm';
import { ProductListService } from './product-list.service';

const STATE_KEY_ITEMS = makeStateKey('db');

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit{
  
  db: any =[];
  products: ProductItemVm[] = [];
  productContainer : ProductItemContainerVM = new ProductItemContainerVM();
  showMoreButton = false;
  loaded: boolean;
  constructor(
    private state: TransferState,
    private productListService: ProductListService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string,
    private activatedRoute: ActivatedRoute) {
      this.loaded = false;
    }

  ngOnInit(): void {
    var listId = this.activatedRoute.snapshot.queryParams["listId"] as string;
    if(listId === "1"){
      this.getProductList("1", "4", true);
      this.showMoreButton = true;
    }
    else{
      this.getProductList();
    }
  }

  getProductList(page: string = "", limit: string = "", showMoreButton = false): void {
    this.loaded = false;
    this.showMoreButton = showMoreButton;
    var url = 'https://my-json-server.typicode.com/stephen-tellier/TestAngularSSR/productist';
    if(page.length > 0 && limit.length > 0){
      url+= '?_page=' + page + '&_limit=' + limit;
    }

    this.productListService.getItems(url)
    .subscribe(
      db => {
        const platform = isPlatformBrowser(this.platformId) ?
          'in the browser' : 'on the server';
        console.log(`\u001b[1;32m getProductList 1 : Running ${platform} with appId=${this.appId} \u001b[0m`);
        if(this.db && this.db.length > 0){
          db.forEach(element => {
            this.db.push(element);
          });
        }
        else{
          this.db = db;
        }
        this.products = this.db;
        this.productContainer.products = this.products; 
        console.log(this.productContainer.products);

        this.loaded = true;
        this.state.set(STATE_KEY_ITEMS, <any> db);
      });

    }

  }


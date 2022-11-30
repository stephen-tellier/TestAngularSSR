import { isPlatformBrowser } from '@angular/common';
import { APP_ID, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ProductListService } from '../../product-list/product-list.service';

const STATE_KEY_ITEMS = makeStateKey('db');
@Component({
  selector: 'app-product-list-client',
  templateUrl: './product-list-client.component.html',
  styleUrls: ['./product-list-client.component.scss']
})
export class ProductListClientComponent implements OnInit{
  
  db: any =[];
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
    this.getProductList();
  }

  getProductList(): void {
    this.loaded = false;
    var listId = this.activatedRoute.snapshot.queryParams["listId"] as string;
    if(listId === "1"){
      this.productListService.getItems('https://my-json-server.typicode.com/stephen-tellier/TestAngularSSR/productist?_page=1&_limit=4')
      .subscribe(
        db => {
          const platform = isPlatformBrowser(this.platformId) ?
            'in the browser' : 'on the server';
          console.log(`\u001b[1;32m getProductList 1 : Running ${platform} with appId=${this.appId} \u001b[0m`);
          this.db = db;
          this.loaded = true;
          this.state.set(STATE_KEY_ITEMS, <any> db);
        });
    }
    else{
      this.productListService.getItems('https://my-json-server.typicode.com/stephen-tellier/TestAngularSSR/productist')
      .subscribe(
        db => {
          const platform = isPlatformBrowser(this.platformId) ?
            'in the browser' : 'on the server';
          console.log(`\u001b[1;32m getProductList 2: Running ${platform} with appId=${this.appId} \u001b[0m`);
          this.db = db;
          this.loaded = true;
          this.state.set(STATE_KEY_ITEMS, <any> db);
        });
    }

    // this.db = this.state.get(STATE_KEY_ITEMS, <any> []);
    
    // if (this.db.length === 0) {
    //   this.productListService.getItems('https://my-json-server.typicode.com/stephen-tellier/TestAngularSSR/productist?_page=1&_limit=4')
    //     .subscribe(
    //       db => {
    //         const platform = isPlatformBrowser(this.platformId) ?
    //           'in the browser' : 'on the server';
    //         console.log(`\u001b[1;32m getProductList : Running ${platform} with appId=${this.appId} \u001b[0m`);
    //         this.db = db;
    //         this.loaded = true;
    //         this.state.set(STATE_KEY_ITEMS, <any> db);
    //       });
    // } else {
    //   this.loaded = true;
    // }
  }

}

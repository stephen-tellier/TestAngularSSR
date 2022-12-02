import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductItemVm } from 'src/app/Model/product-item-vm';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
    }
  )
};

@Injectable({
  providedIn: 'root'
})
export class ProductListService {

  constructor(private http: HttpClient) { }

  getItems(url: string) {
    return this.http.get(url, httpOptions) as Observable<ProductItemVm[]>;

    // return new Promise((resolve, reject) => {
    //   return this.http.get(url, httpOptions)
    //   .toPromise()
    //   .then((result: ProductItemVm[]) => {
    //     return resolve(result);
    //   })
    //   .catch(err => reject(err));
    // }
  }
  
}

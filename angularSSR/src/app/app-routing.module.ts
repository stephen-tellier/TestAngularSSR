import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'server/listeproduit',
    loadChildren: () => import('./modules/product-list/product-list.module')
      .then(mod => mod.ProductListModule)
  },  
  {
    path: 'client/listeproduitclient',
    loadChildren: () => import('./modules/client/product-list-client/product-list-client.module')
      .then(mod => mod.ProductListClientModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

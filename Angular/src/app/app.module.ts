import { BrowserModule } from '@angular/platform-browser';
import { NgModule,enableProdMode} from '@angular/core';
import { FormsModule }   from '@angular/forms';
import{Routes, RouterModule} from "@angular/router";
import {NgxPaginationModule} from 'ngx-pagination'; 
import { ImageUploadModule } from "angular2-image-upload";
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxDataGridModule } from 'devextreme-angular';


//FireDataBase Setting
// import {AngularFireDatabaseModule, AngularFireDatabase} from 'angularfire2/database'
// import { AngularFireModule } from 'angularfire2';
// import { environment } from '../environments/environment';
// import {AngularFireAuthModule} from 'angularfire2/auth';
// import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';

///////////////////////////////

import { AppComponent } from './app.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { HeaderComponent } from './header/header.component';
import { AddProductService } from './add-product/add-product.service';
import { HttpModule } from '@angular/http';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { ListOrdersComponent } from './orders/list-orders.component';
import { OrderService } from './orders/order.service';
import { CartServiceService } from './view-cart/cart-service.service';
import { ProductSearchComponent } from './product-list/product-search/product-search.component';
// import { ScrollingComponent } from './scrolling/scrolling.component';
// import { ScrollingService } from './scrolling.service';


const routes:Routes=[
  {path:'', component : AddProductComponent },
  {path:'products/search', component :  ProductSearchComponent},
  {path:'orders/getall', component :  ListOrdersComponent},
  {path:'products/add-product', component : AddProductComponent },
  {path:'products/display-all', component : ProductListComponent },
  {path:'viewCart', component : ViewCartComponent }
]
enableProdMode();
@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    ProductListComponent,
    HeaderComponent,
    ViewCartComponent,
    ListOrdersComponent,
    ProductSearchComponent
    // ScrollingComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpModule,
    NgxPaginationModule,
    ImageUploadModule.forRoot(),
    DxDataGridModule
    //FireDataBase Setting
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFireDatabaseModule,
    // AngularFireAuthModule,
    // FirebaseListObservable,
    // FirebaseObjectObservable
  ],
  providers: [OrderService,AddProductService,CartServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
// platformBrowserDynamic().bootstrapModule(AppModule);

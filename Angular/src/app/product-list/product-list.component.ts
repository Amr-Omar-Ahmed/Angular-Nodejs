import { Component, OnInit } from '@angular/core';

import { AddProductService } from '../add-product/add-product.service';
import { product } from '../shared/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private productsService: AddProductService ) { }
  p: number = 1;
  products: Array<product> = [];

  ngOnInit() {
    this.productsService.getAllProducts().subscribe(res => {
      this.products = res.result;
    }
    );
  }

  AddToCart(id) {
    this.productsService.getProductDetails(id).subscribe(res => {
      if (localStorage.getItem('cart') == null) {
        let addedProducts: any = [];
        res.result[0].QTY = 1;
        addedProducts.push(res.result[0]);
        localStorage.setItem('cart', JSON.stringify(addedProducts));
      }
      else {
        let addedProducts: any = JSON.parse(localStorage.getItem('cart'));
        var currentAddedProduct = addedProducts.filter(function (o) {
          return o.id == res.result[0].id;
        });
        if (currentAddedProduct != null) {
          currentAddedProduct.map(function (o) {
            return o.QTY = o.QTY + 1;
          });
          localStorage.setItem('cart', JSON.stringify(addedProducts));
        }
        if (currentAddedProduct.length == 0) {
          res.result[0].QTY = 1;
          addedProducts.push(res.result[0]);
          localStorage.setItem('cart', JSON.stringify(addedProducts))
        };
      }
    }
    );
    this.productsService.decremenQnt(id).subscribe(res => {
      console.log(res.result);
      this.products = res.result;
    });

  }
}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/filter';
import { AddProductService } from '../../add-product/add-product.service';
import { product } from '../../shared/product.model';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {
  p: number = 1;
  productName;
  products: Array<product> = [];
  noProducts: boolean = true;

  constructor(private activatedRoute: ActivatedRoute, private productService: AddProductService) { }
  ngOnInit() {
    debugger;
    this.activatedRoute.queryParams
      .filter(params => params.productName)
      .subscribe(params => {
        this.productName = params.productName;
      });
    this.productService.searchForProduct(this.productName).subscribe(res => {
      if (res.result.length > 0) {
        this.products = res.result;
      }
      else {
        this.noProducts = false;
      }
    }
    );
  }

}

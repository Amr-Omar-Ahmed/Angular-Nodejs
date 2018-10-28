import { Component, OnInit } from '@angular/core';
import { OrderService } from '../orders/order.service';
import { AddProductService } from '../add-product/add-product.service';
import { product } from '../shared/product.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
searchWord="";
  constructor(
    private OrderService: OrderService,
     private productService: AddProductService
  ) { }

  listOfProducts: Array<product> = [];

  ngOnInit() {
    
    this.productService.getAllProducts().subscribe(res => this.listOfProducts = res.result);
  }
}
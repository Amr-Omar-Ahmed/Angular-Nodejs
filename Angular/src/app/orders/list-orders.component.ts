import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Order } from '../shared/Order.model';
import { product } from '../shared/product.model';
import { OrderService } from './order.service';
import { tick } from '@angular/core/testing';
import { CartServiceService } from '../view-cart/cart-service.service';

declare const $;
@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css']
})

export class ListOrdersComponent implements OnInit {
  Orders: Array<Order> = [];
  currentIndex: number;
  selectedOrder = [];
  p: number = 1;
  
  constructor(private OrderService: OrderService, private cartService: CartServiceService) { }

  ngOnInit() {
    this.OrderService.GetAllOrders().subscribe(res => {
      this.Orders = res.result;
    });
  }

  DeleteProduct(productId, orderId) {
    debugger;
    var currentOrder = this.selectedOrder[0].products;
    for (var i = 0; i < this.selectedOrder[0].products.length; i++) {
      if (currentOrder[i].id === productId) {
        currentOrder.splice(i, 1);
        var s = this.Orders;
      }
    }
  }
  changeAmount(productId, prdQty, orderId) {
    var currentOrder = this.selectedOrder.find((o => o.ID == orderId));
    for (var i = 0; i < currentOrder.products.length; i++) {
      if (currentOrder.products[i] !== undefined) {
        if (currentOrder.products[i].id === productId) {
          if (prdQty < currentOrder.products[i].amountAvailable) {
            currentOrder.products[i].QTY = prdQty;
            this.currentIndex = -1;
          }
          else {
            alert("Sorry, the avaliable amount of this product is " + currentOrder.products[i].amountAvailable);
            this.currentIndex = -1;
          }
        }
      }
    }
  };
  ChangeQty(CurrIndex) {
    this.currentIndex = CurrIndex;
  }


  addOrder(orderID, orderUserName) {
    var productsInCurrentOrder = this.Orders.filter(function (o) {
      return o.ID == orderID;
    }).map(function (o) {
      return o.products;
    });

    var orderDetails = {
      ID: 1,
      UserName: orderUserName,
      products: productsInCurrentOrder[0]
    };
    if (productsInCurrentOrder[0].length > 0) {
      this.cartService.CreateOrder(orderDetails).subscribe((res) => console.log(res));
    }
    else {
      alert("please choose at least one product");
      // window.location.href = "http://localhost:4200/orders/getall";
      this.OrderService.GetAllOrders().subscribe(res => {
        this.Orders = res.result;
      });
      $('#exampleModalCenter').modal('hide');
    }
  }

  requestOrder(orderID) {
    this.selectedOrder = this.Orders.filter(function (o) {
      return o.ID == orderID;
    });
  };
}
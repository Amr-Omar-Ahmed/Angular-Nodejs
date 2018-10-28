import { Component, OnInit } from '@angular/core';
import { User } from '../shared/User.model';
import { product } from '../shared/product.model';
import { Order } from '../shared/Order.model';
import { CartServiceService } from './cart-service.service';
import { JsonpModule } from '@angular/http';
declare const $;

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit {
  products: product[];
  productsInCart: any = [];
  currentIndex: number;
  checkOutFlag:boolean=true;

  
  constructor(private cartService: CartServiceService) { }
  ngOnInit() {
      this.productsInCart = JSON.parse(localStorage.getItem('cart'));
  }

  user: User = {
    ID: null,
    Name: null,
    Email: null,
    Address: null
  }

  addOrder() {
    var newUser: User = {
      ID: this.user.ID,
      Name: this.user.Name,
      Email: this.user.Email,
      Address: this.user.Address
    };

    this.cartService.CreateUser(newUser).subscribe((res) => console.log(res));
     var orderDetails = {
      ID: 1,
      UserName: this.user.Name,
      products: this.productsInCart
    };
        
    this.cartService.CreateOrder(orderDetails).subscribe((res) => console.log(res));

    $('#exampleModalCenter').modal('hide');
    this.user.ID = null;
    this.user.Name = null;
    this.user.Email = null;
    this.user.Address = null;
    localStorage.setItem('cart',JSON.stringify([ ]));
    this.checkOutFlag=false;
  }
}

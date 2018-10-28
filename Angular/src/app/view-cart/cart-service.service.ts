import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CartServiceService {

  constructor(private http: Http) { };

  CreateUser(user) {
    return this.http.post('http://localhost:9011/orders/createUser', user)
      .map((res) => res.json());
  }

  CreateOrder(order) {
    debugger;
    return this.http.post('http://localhost:9011/orders/createOrder', order)
      .map((res) => res.json());
  }

}

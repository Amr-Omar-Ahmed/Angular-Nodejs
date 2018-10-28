import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Order } from "../shared/Order.model";
import { Options } from 'selenium-webdriver';


@Injectable()
export class OrderService {
    listOrders = [];
    listProducts = [];
    constructor(private http: Http) {};

    GetAllOrders() {
        return this.http.get('http://localhost:9011/orders/getall').map
            (res => res.json());
    };
    
     GetAllOrdersByUserName(UserName: string) {
        debugger;
        return this.http.get('http://localhost:9011/orders/getallByUserName/' + UserName).map
            (res => res.json());
    };
    
    OrderByUser(arr) {
        debugger;
        this.listOrders = arr;
    }

    ReOrder(orderId) {
        if (this.listOrders["result"] !== undefined)
            this.listOrders = this.listOrders["result"]
        // debugger;
        var Neworder = this.listOrders.find((obj => obj.ID == orderId));
        return this.http.post('http://localhost:9011/orders/update', Neworder)
            .map((res) => res.json());
    }
}
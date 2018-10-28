import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class AddProductService {
    headers;
    constructor(private http: Http) {
        this.headers = new Headers();
        this.headers.append('content-type', 'application/json');
    };

    //add product
    addProduct(product) {
        console.log(product);
        return this.http.post('http://localhost:9011/products/add', product).map((res) => res.json());
    }

    //getAll products
    getAllProducts() {
        return this.http.get('http://localhost:9011/products/getall').map(res => res.json());
    }
    //get all users
    getAllUsers(){
        return this.http.get('http://localhost:9011/users/getall').map(res => res.json());
    }

    //get product by id
    getProductDetails(id) {
        return this.http.get("http://localhost:9011/products/get/" + id).map(res => res.json());
    }

    //decrement the avaliable qnt
    decremenQnt(id) {
        return this.http.get("http://localhost:9011/products/decrement/" + id).map(res => res.json());
    }

    //search for a product
    searchForProduct(productName) {
        debugger;
        return this.http.get("http://localhost:9011/products/search/" + productName).map(res => res.json());
    }
    
}

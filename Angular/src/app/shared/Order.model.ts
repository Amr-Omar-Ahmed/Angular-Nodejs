import { identifierModuleUrl } from "@angular/compiler";
import { product } from "./product.model";

export class Order{
    ID :number;
    UserName :string;
    products :product[]=[];
constructor(id:number ,userName: string, products:product[]){
this.ID=id;
this.products=products;
this.UserName=userName;
}


}
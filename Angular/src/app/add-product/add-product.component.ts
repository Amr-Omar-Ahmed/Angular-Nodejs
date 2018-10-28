import { Component, OnInit } from '@angular/core';
import { product } from '../shared/product.model';
import { AddProductService } from './add-product.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent implements OnInit {

  products: Array<product> = [];

  constructor(private AddProductService: AddProductService) { }
  ngOnInit() {

  };

  submitted: boolean = false;
  product: product = {
    id: 1,
    name: null,
    description: null,
    amountAvailable: null,
    price: null,
    image:null,
    QTY:0
  };


  maxId: number = 1;

  submit() {
    //Add New Product
    this.AddProductService.addProduct(this.product).subscribe(res => console.log(res));
    this.submitted = true;
  };

  AddNewProduct() {
    this.submitted = false;

  }

  _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.product.image = btoa(binaryString);
  }

  onFileChange(event) {
    const reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(event.file);
  }

  onRemoved(event) {
    this.product.image = null;
  }
}

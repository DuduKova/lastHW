import {Component} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Product} from './product';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

@Component({
  selector: 'abe-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly ROOT_URL = 'http://localhost:3000/';

  products: Observable<any>;
  newProduct: Observable<any>;
  foundClicked: number;
  // <Product[]>
  constructor(private http: HttpClient) {
  }

  toggleEditable(event) {
    if ( event.target.checked ) {
      this.foundClicked = 1;
    } else {
      this.foundClicked = 0;
    }
  }

  getProducts() {
    this.products = this.http.get(this.ROOT_URL + 'list');
  }

  getProductByName(name) {
    this.products = this.http.get(this.ROOT_URL + 'list/' + name);
  }

  createProduct(name , quantity) {
    const data: Product = {
      name: name.value,
      quantity: quantity.value,
      found: this.foundClicked
    };
    this.newProduct = this.http.post<Product>(this.ROOT_URL + 'list' , data).map( product => product.name);
  }

  updateProduct(id , name , quantity) {
    const data = {
      id: id,
      name: name,
      quantity: quantity,
      found: this.foundClicked
    };
    this.newProduct = this.http.put(this.ROOT_URL + 'list/' + id , data);
  }

  deleteProduct(id) {
    this.newProduct = this.http.delete(this.ROOT_URL + 'list/' + id , id);
  }
}

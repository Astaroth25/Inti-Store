import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductI } from '../Interfaces/product-interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseURL:string = 'http://localhost:3000/product';
  private http = inject(HttpClient)

  getAllProducts():Observable<ProductI[]>{
    return this.http.get<ProductI[]>(this.baseURL+'/all');
  }

  constructor() { }
}

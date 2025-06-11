import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductI } from '../Interfaces/product-interface';
import { CategoryI } from '../Interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseURL: string = 'https://intistore-backend.vercel.app/product';
  private http = inject(HttpClient)

  getAllProducts(): Observable<ProductI[]> {
    return this.http.get<ProductI[]>(this.baseURL + '/all');
  }

  getOneProduct(id: string): Observable<ProductI> {
    return this.http.get<ProductI>(this.baseURL + `/${id}`);
  }

  getProductsByCategory(category: string): Observable<ProductI[]> {
    let params = new HttpParams();
    params = params.append('category', category);
    return this.http.get<ProductI[]>(this.baseURL + '/all', { params: params })
  }

  getAllCategories(): Observable<CategoryI[]> {
    return this.http.get<CategoryI[]>(this.baseURL + '/categories');
  }
}

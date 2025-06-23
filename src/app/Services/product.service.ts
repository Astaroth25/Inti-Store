import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, BehaviorSubject, tap, catchError, of } from 'rxjs';
import { ProductI } from '../Interfaces/product';
import { SearchParams } from '../Interfaces/searchParams';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseURL: string = 'https://intistore-backend.vercel.app/product/';
  private http = inject(HttpClient)

  private _products = new BehaviorSubject<ProductI[]>([]);
  private _productsHighlight = new BehaviorSubject<ProductI[]>([]);
  public products$ = this._products.asObservable();
  public productsHighlight$ = this._productsHighlight.asObservable();

  getProducts(searchParams: SearchParams = {}): Observable<ProductI[]> {
    let params = new HttpParams();
    if (searchParams.category) {
      params = params.append('category', searchParams.category);
    }
    if (searchParams.name) {
      params = params.append('name', searchParams.name);
    }
    return this.http.get<ProductI[]>(this.baseURL, { params: params }).pipe(
      tap(products => this._products.next(products)), 
    catchError(error => {
      console.error('Error Obtaining Products: ', error);
      this._products.next([]);
      return of ([]);
    }));
  }

  getOneProduct(id: string): Observable<ProductI> {
    return this.http.get<ProductI>(this.baseURL + `${id}`);
  }

  getHighlights():Observable<ProductI[]>{
    return this.http.get<ProductI[]>(this.baseURL + 'highlight').pipe(
      tap(products => {
        this._productsHighlight.next(products);
        console.log(this.productsHighlight$);
      }),
      catchError(error => {
        console.error('Error Obtaining Products: ', error);
      this._productsHighlight.next([]);
      return of ([]);
      })
    );
  }
}

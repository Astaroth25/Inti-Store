import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, BehaviorSubject, tap, catchError, of } from 'rxjs';
import { ProductI, ProductPaginationI } from '../Interfaces/product';
import { SearchParams } from '../Interfaces/searchParams';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseURL: string = 'https://intistore-backend.vercel.app/product/';
  // private baseURL: string = 'http://localhost:3000/product/';
  private http = inject(HttpClient)

  private _products = new BehaviorSubject<ProductPaginationI>({
    products: [],
    currentPage: 1,
    limitPerPage: 20,
    totalProducts: 0,
    totalPages: 0,
    nextPage: null,
    previousPage: null
  });
  private _productsHighlight = new BehaviorSubject<ProductI[]>([]);
  public products$ = this._products.asObservable();
  public productsHighlight$ = this._productsHighlight.asObservable();

  getProducts(searchParams: SearchParams = {}): Observable<ProductPaginationI> {
    let params = new HttpParams();
    if (searchParams.category) {
      params = params.append('category', searchParams.category);
    }
    if (searchParams.name) {
      params = params.append('name', searchParams.name);
    }
    if (searchParams.page) {
      params = params.append('page', searchParams.page);
    }
    if (searchParams.limit) {
      params = params.append('limit', searchParams.limit);
    }
    return this.http.get<ProductPaginationI>(this.baseURL, { params: params }).pipe(
      tap(response => {
          this._products.next(response);
          console.log(this.products$)
      }),
      catchError(() => {
        console.error('Error Obtaining Products.');
        this._products.next({
          products: [],
          currentPage: 1,
          limitPerPage: searchParams.limit || 20,
          totalProducts: 0,
          totalPages: 0,
          nextPage: null,
          previousPage: null
        });
        return of({
          products: [],
          currentPage: 1,
          limitPerPage: searchParams.limit || 20,
          totalProducts: 0,
          totalPages: 0,
          nextPage: null,
          previousPage: null
        });
      }));
  }

  getOneProduct(id: string): Observable<ProductI> {
    return this.http.get<ProductI>(this.baseURL + `${id}`);
  }

  getHighlights(): Observable<ProductI[]> {
    return this.http.get<ProductI[]>(this.baseURL + 'highlight').pipe(
      tap(products => {
        this._productsHighlight.next(products);
      }),
      catchError(() => {
        console.error('Error Obtaining Products.');
        this._productsHighlight.next([]);
        return of([]);
      })
    );
  }
}

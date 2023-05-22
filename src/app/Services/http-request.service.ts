import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  private productCache: Map<number, any> = new Map<number, any>();

  constructor(private http: HttpClient) { }

  getTotalProducts(): Observable<number> {
    const url = 'https://dummyjson.com/products';
    return this.http.get<any>(url).pipe(
      map(response => response.total)
    );
  }

  getAllProducts(): Observable<any[]> {
    const url = 'https://dummyjson.com/products';
    return this.http.get<any[]>(url).pipe(
      map((response: any) => response.products)
    );
  }

  getProduct(productId: number): Observable<any> {
    // Comprueba si el producto está en caché
    if (this.productCache.has(productId)) {
      return of(this.productCache.get(productId));
    }

    // Si no está en caché, realiza la solicitud HTTP
    const url = `https://dummyjson.com/products/${productId}`;
    return this.http.get<any>(url).pipe(
      tap((product) => {
        // Almacena el producto en caché
        this.productCache.set(productId, product);
      })
    );
  }

  getProducts(startProductId: number, endProductId: number): Observable<any[]> {
    const requests = [];

    for (let i = startProductId; i <= endProductId; i++) {
      requests.push(this.getProduct(i));
    }

    return forkJoin(requests);
  }

  searchProducts(query: string): Observable<any> {
    const url = `https://dummyjson.com/products/search?q=${query}`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        return {
          products: response.products,
          total: response.total
        };
      })
    );
  }
}

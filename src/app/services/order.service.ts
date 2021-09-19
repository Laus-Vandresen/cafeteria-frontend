import { Order } from './../models/order.model';
import { Product } from './../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl = 'https://cafeteria-java-backend.herokuapp.com/api/order'

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string):void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  createOrder(): Observable<number> {
    return this.http.post<number>(this.baseUrl + '/create-new-order', {})
  }

  addNewItem(orderId: number, productId: number, quantity: number): Observable<Product> {
    const url = `${this.baseUrl}/${orderId}/${productId}/${quantity}`;
    return this.http.put<Product>(url, {});
  }

  removeItem(orderId: number, productId: number, quantity: number): Observable<Product> {
    const url = `${this.baseUrl}/${orderId}/${productId}/${quantity}`;
    return this.http.delete<Product>(url, {});
  }

  getTotalPrice(orderId: number): Observable<Order> {
    const options = {
      params: {
        orderId
      }
    }
    return this.http.get<Order>(this.baseUrl, options );
  }

  closeOrder(orderId:number, paidValue: number, totalPrice: number): Observable<Order> {
    const url = `${this.baseUrl + '/close-order'}/${orderId}/${paidValue}/${totalPrice}`;
    return this.http.put<Order>(url, {});
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl + '/get-all')
  }
}

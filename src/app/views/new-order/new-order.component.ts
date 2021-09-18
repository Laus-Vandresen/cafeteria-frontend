import { FinishOrderComponent } from './../../components/finish-order/finish-order.component';
import { ProductService } from './../../services/product.service';
import { Product } from './../../models/product.model';
import { OrderService } from './../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {

  orderId: number = 0;
  totalPrice: number = 0;

  products: Product[] = [];
  displayedColumns = ['id', 'name', 'quantity']


  constructor(private orderService: OrderService, private productService: ProductService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.createOrder();
    this.findAllProducts();
  }

  createOrder(): void {
    this.orderService.createOrder().subscribe(orderId => {
      this.orderId = orderId;
    })
  }

  findAllProducts() {
    this.productService.findAll().subscribe(resp => {
      this.products = resp;
    });
  }

  removeQuantity(product: Product): void {
    if (product.id) {
      this.orderService.removeItem(this.orderId, product.id, 1).subscribe(productOrder => {
        product.quantity = productOrder.quantity;
        this.getTotalPrice();
      });
    }
  }

  addQuantity(product: Product): void {
    if (product.id) {
      this.orderService.addNewItem(this.orderId, product.id, 1).subscribe(productOrder => {
        product.quantity = productOrder.quantity;
        this.getTotalPrice();
      });
    }
  }

  getTotalPrice() {
    this.orderService.getTotalPrice(this.orderId).subscribe(order => {
      this.totalPrice = order.totalPrice;
    })
  }

  finishOrder() {
    this.dialog.open(FinishOrderComponent,
      {
        data: {
          totalPrice: this.totalPrice,
          orderId: this.orderId
        }
      });
  }

}

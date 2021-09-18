import { OrderService } from './../../services/order.service';
import { Order } from './../../models/order.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders: Order[] = [];
  displayedColumns = ['id', 'status', 'paidValue', 'totalPrice']

  constructor(private router: Router, private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe(orders => {
      this.orders = orders;
    })
  }

  navigateToOrderCreate():void {
    this.router.navigate(['/new-order']);
  }

}

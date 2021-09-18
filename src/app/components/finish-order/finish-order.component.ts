import { OrderService } from './../../services/order.service';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finish-order',
  templateUrl: './finish-order.component.html',
  styleUrls: ['./finish-order.component.css']
})
export class FinishOrderComponent implements OnInit {

  paidValue: number = this.data.totalPrice;
  changeValue: number = 0.0;
  disableButton: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {totalPrice: number, orderId: number}, private router: Router, private orderService: OrderService) { }

  ngOnInit(): void {
  }

  finishOrder() {
    this.orderService.closeOrder(this.data.orderId, this.paidValue, this.data.totalPrice).subscribe();
    this.router.navigate(['/orders']);
  }

  changePaidValue() {
    if (this.paidValue > this.data.totalPrice) {
      this.changeValue = this.paidValue - this.data.totalPrice;
      this.disableButton = false;
    } else {
      this.changeValue = 0;
      this.disableButton = true;
    }
  }
}

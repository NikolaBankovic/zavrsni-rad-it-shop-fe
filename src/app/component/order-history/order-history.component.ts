import {Component, inject} from '@angular/core';
import {OrderService} from "../../service/order.service";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent {

  protected orders: any[] = [];

  private readonly orderService = inject(OrderService);

  ngOnInit() {
    this.orderService.getOrdersForCurrentUser().subscribe(data => {
      this.orders = data as any[];
    })
  }
}

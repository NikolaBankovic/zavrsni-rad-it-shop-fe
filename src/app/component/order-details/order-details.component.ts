import {Component, inject} from '@angular/core';
import {OrderService} from "../../service/order.service";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../../dto/product.dto";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent {
    protected order: any;

    private readonly route = inject(ActivatedRoute);
    private readonly orderService = inject(OrderService);

    ngOnInit() {
      const id = this.route.snapshot.params['id'];
      this.orderService.getOrderById(id).subscribe(data => {
        this.order = data as Product;
      })
    }
}

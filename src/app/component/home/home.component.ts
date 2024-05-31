import {Component, inject} from '@angular/core';
import {ProductService} from "../../service/product.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  private readonly productService = inject(ProductService);

  ngOnInit() {
    this.productService.getProducts().subscribe(data => console.log(data));
  }

}

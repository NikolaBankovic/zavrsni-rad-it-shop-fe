import {Component, inject} from '@angular/core';
import {CodebookService} from "../../service/codebook.service";
import {NgForOf, NgIf} from "@angular/common";
import {Category} from "../../dto/category.dto";
import {AppNavigation} from "../../app.navigation";

@Component({
  selector: 'app-category-nav',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './category-nav.component.html',
  styleUrl: './category-nav.component.css'
})
export class CategoryNavComponent {

  private readonly codebookService = inject(CodebookService);
  private readonly navigation = inject(AppNavigation);

  categories: Category[] = [];

  constructor() {
    this.codebookService.getCategories().subscribe(data => {
      this.categories = data;
    })
  }

  showSubCategories(category: any) {
    category.showSubCategories = true;
  }

  hideSubCategories(category: any) {
    category.showSubCategories = false;
  }

  onCategoryClick(categoryName: string) {
    console.log(categoryName);
    this.navigation.navigateToProductList(categoryName);
  }

  onSubCategoryClick(category: Category, subCategory: string) {
    this.navigation.navigateToProductListWithSubCategory(category.name, subCategory);
  }
}

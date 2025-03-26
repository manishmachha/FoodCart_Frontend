import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FoodItemsService } from '../../services/foodItems/food-items.service';

@Component({
  selector: 'app-food-items',
  templateUrl: './food-items.component.html',
  styleUrl: './food-items.component.css',
  standalone: false,
})
export class FoodItemsComponent {
  foodItems: any[] = [];
  filteredFoodItems: any[] = [];
  searchTerm: string = '';
  selectedStatus: string = '';
  sortBy: string = '';
  statuses: string[] = ['true', 'false']; // Active status options
  showSearch = false;
  showFilter = false;
  showSort = false;

  constructor(
    private foodItemService: FoodItemsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.foodItemService.getFoodItems().subscribe((foodItems) => {
      this.foodItems = foodItems.data.map(this.convertImage);
      this.filteredFoodItems = this.foodItems;
    });
  }

  editFoodItem(id: number) {
    console.log(`Editing food item with ID: ${id}`);
  }

  deleteFoodItem(id: number) {
    console.log(`Deleting food item with ID: ${id}`);
  }

  addFoodItem() {
    this.router.navigate(['/add-food-item']);
  }

  toggleOption(option: string) {
    if (option === 'search') {
      this.showSearch = !this.showSearch;
      this.showFilter = false;
      this.showSort = false;
    } else if (option === 'filter') {
      this.showFilter = !this.showFilter;
      this.showSearch = false;
      this.showSort = false;
    } else if (option === 'sort') {
      this.showSort = !this.showSort;
      this.showSearch = false;
      this.showFilter = false;
    }
  }

  applyFilters(): void {
    this.filteredFoodItems = this.foodItems.filter(
      (foodItem) =>
        foodItem.name?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        foodItem.restaurantName
          ?.toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        foodItem.price?.toString().includes(this.searchTerm)
    );

    if (this.selectedStatus) {
      this.filteredFoodItems = this.filteredFoodItems.filter(
        (foodItem) => foodItem.isActive.toString() === this.selectedStatus
      );
    }

    if (
      this.sortBy &&
      this.filteredFoodItems.every((item) => item[this.sortBy] !== undefined)
    ) {
      this.filteredFoodItems.sort((a, b) => {
        const valA = a[this.sortBy]?.toString() || '';
        const valB = b[this.sortBy]?.toString() || '';
        return valA.localeCompare(valB);
      });
    }
  }

  // byte[] to image conversion
  convertImage(data: any) {
    return {
      id: data.id,
      name: data.name,
      price: data.price,
      image: 'data:image/jpg;base64,' + data.image,
      restaurantName: data.restaurantName,
      restaurantId: data.restaurantId,
      active: data.active,
    };
  }
}

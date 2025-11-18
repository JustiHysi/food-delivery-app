import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MenuService } from '../services/menu.service';
import { MenuItem } from '../restaurant-owner-dashboard/menu-item.model';

@Component({
  selector: 'app-restaurant-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './restaurant-modal.component.html',
  styleUrls: ['./restaurant-modal.component.scss'],
})
export class RestaurantModalComponent implements OnInit {
  @Input() restaurantData: any;
  @Output() close = new EventEmitter<void>();
  @Output() dataSaved = new EventEmitter<any[]>();
  @Output() next = new EventEmitter<void>();
  @Output() totalPriceEvent = new EventEmitter<number>();

  mockData: MenuItem[] = [
    {
      id: 'item_1',
      name: 'Morning Chill Crisp',
      description: 'Excepteur sint occaecat cupidatat non proi',
      price: 500,
      imageUrl: 'assets/opadish1.png',
      quantity: 0,
      category: 'Breakfast',
    },
    {
      id: 'item_2',
      name: 'Afternoon Delight Smoothie',
      description: 'A refreshing blend of tropical fruits to energize your afternoon',
      price: 400,
      imageUrl: 'assets/opadish1.png',
      quantity: 0,
      category: 'Drinks',
    },
  ];

  menu: MenuItem[] = []; // Combined menu
  totalPrice: number = 0;
  selectedCategory: string = 'All';

  constructor(private menuService: MenuService, private router: Router) {}

  ngOnInit(): void {
    this.initializeMenu();
  }

  initializeMenu() {
    this.menuService.getProducts().subscribe((newProducts) => {
      const combinedMenu = [...this.mockData, ...newProducts];
      this.menu = this.removeDuplicates(combinedMenu);
      console.log('Updated menu:', this.menu);
    });
  }

  // Ensure no duplicate items by ID
  removeDuplicates(menu: MenuItem[]): MenuItem[] {
    return menu.filter(
      (item, index, self) => index === self.findIndex((t) => t.id === item.id)
    );
  }

  incrementQuantity(dish: MenuItem) {
    dish.quantity = (dish.quantity || 0) + 1;
    this.calculateTotalPrice();
  }

  decrementQuantity(dish: MenuItem) {
    if (dish.quantity && dish.quantity > 0) {
      dish.quantity--;
      this.calculateTotalPrice();
    }
  }

  calculateTotalPrice() {
    this.totalPrice = this.menu.reduce(
      (sum, dish) => sum + (dish.quantity || 0) * dish.price,
      0
    );
  }

  saveProducts() {
    const selectedProducts = this.menu
      .filter((dish) => dish.quantity && dish.quantity > 0)
      .map((dish) => ({
        id: dish.id,
        name: dish.name,
        quantity: dish.quantity,
        price: dish.price,
      }));

    this.dataSaved.emit(selectedProducts);
    this.totalPriceEvent.emit(this.totalPrice);
    this.next.emit();
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  get filteredDishes() {
    if (this.selectedCategory === 'All') {
      return this.menu;
    }
    return this.menu.filter((dish) => dish.category === this.selectedCategory);
  }

  closeModal() {
    this.close.emit();
  }
}

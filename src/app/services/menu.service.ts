import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuItem } from '../restaurant-owner-dashboard/menu-item.model';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private mockData: MenuItem[] = [
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

  private menuItems: MenuItem[] = [];
  private menuSubject = new BehaviorSubject<MenuItem[]>([]);

  constructor() {
    this.initializeMenu();
  }

  private initializeMenu(): void {
    const storedMenu = localStorage.getItem('menuData');
    if (storedMenu) {
      this.menuItems = JSON.parse(storedMenu);
    } else {
      this.menuItems = [...this.mockData];
    }
    this.menuSubject.next([...this.menuItems]);
  }

  addProduct(product: MenuItem): void {
    const newProduct = { ...product, id: this.generateId() };
    this.menuItems.push(newProduct);
    this.updateLocalStorage();
    this.menuSubject.next([...this.menuItems]);
  }

  updateProduct(updatedProduct: MenuItem): void {
    const index = this.menuItems.findIndex((item) => item.id === updatedProduct.id);
    if (index !== -1) {
      this.menuItems[index] = updatedProduct;
      this.updateLocalStorage();
      this.menuSubject.next([...this.menuItems]);
    }
  }

  deleteProduct(productId: string): void {
    this.menuItems = this.menuItems.filter((item) => item.id !== productId);
    this.updateLocalStorage();
    this.menuSubject.next([...this.menuItems]);
  }

  getProducts() {
    return this.menuSubject.asObservable();
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  private updateLocalStorage(): void {
    localStorage.setItem('menuData', JSON.stringify(this.menuItems));
  }
}

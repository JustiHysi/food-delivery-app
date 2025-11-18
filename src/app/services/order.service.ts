import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orders: {
    restaurantId: number;
    products: { name: string; quantity: number; price: number }[];
    address: string;
    totalAmount: number;
    orderDate: Date;
  }[] = [];

  private ordersSubject = new BehaviorSubject(this.orders);

  constructor() {}

  /**
   * Add a new order to the local array and notify subscribers
   * @param order - The order object to add
   */
  addOrder(order: {
    restaurantId: number;
    products: { name: string; quantity: number; price: number }[];
    address: string;
    totalAmount: number;
    orderDate: Date;
  }): void {
    console.log('Adding new order:', order); // Debug log
    this.orders.push(order); // Add to local array
    this.ordersSubject.next([...this.orders]); // Emit updated orders
    console.log('Updated orders:', this.orders); // Verify orders array
  }

  /**
   * Get orders as an observable for live updates
   * @returns Observable of orders
   */
  getOrders() {
    return this.ordersSubject.asObservable();
  }
}

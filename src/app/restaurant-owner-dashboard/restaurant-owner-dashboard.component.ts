import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { OrderService } from '../services/order.service';
import { MenuService } from '../services/menu.service';
import { MenuItem } from './menu-item.model';
import { AddProductModalComponent } from '../add-product-modal/add-product-modal.component';

@Component({
  selector: 'app-restaurant-owner-dashboard',
  standalone: true,
  templateUrl: './restaurant-owner-dashboard.component.html',
  styleUrls: ['./restaurant-owner-dashboard.component.scss'],
  imports: [CommonModule, AddProductModalComponent],
  providers: [CurrencyPipe, DatePipe],
})
export class RestaurantOwnerDashboardComponent implements OnInit {
  activeTab: string = 'orders';
  orders: {
    restaurantId: number;
    products: { name: string; quantity: number; price: number }[];
    address: string;
    totalAmount: number;
    orderDate: Date;
    status?: string;
  }[] = [];
  menuItems: MenuItem[] = [];
  showAddProductModal: boolean = false;
  selectedProduct: MenuItem | null = null;

  constructor(
    private orderService: OrderService,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
    this.loadMenuItems();
  }

  switchTab(tab: string): void {
    this.activeTab = tab;
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe((orders) => {
      this.orders = orders;
    });
  }

  loadMenuItems(): void {
    this.menuService.getProducts().subscribe((items) => {
      this.menuItems = items;
    });
  }

  addProduct(product: MenuItem): void {
    this.menuService.addProduct(product);
    this.closeAddProductModal();
  }

  editProduct(item: MenuItem): void {
    this.selectedProduct = { ...item };
    this.showAddProductModal = true;
  }

  saveProduct(updatedProduct: MenuItem): void {
    this.menuService.updateProduct(updatedProduct);
    this.selectedProduct = null;
    this.showAddProductModal = false;
  }

  deleteProduct(productId: string): void {
    this.menuService.deleteProduct(productId);
  }

  openAddProductModal(): void {
    this.selectedProduct = null;
    this.showAddProductModal = true;
  }

  closeAddProductModal(): void {
    this.selectedProduct = null;
    this.showAddProductModal = false;
  }

  updateOrderStatus(order: any): void {
    if (order.status === 'Completed') {
      order.status = 'Pending';
    } else {
      order.status = 'Completed';
    }
  }
  
}

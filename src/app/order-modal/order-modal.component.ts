import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { RestaurantModalComponent } from '../restaurant-modal/restaurant-modal.component';
import { MapComponent } from '../map/map.component';
import { CheckoutComponent } from '../checkout/checkout.component';
import { CommonModule } from '@angular/common';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-modal',
  standalone: true,
  templateUrl: './order-modal.component.html',
  imports: [
    RestaurantModalComponent,
    MapComponent,
    CheckoutComponent,
    CommonModule,
  ],
  styleUrls: ['./order-modal.component.scss'],
})
export class OrderModalComponent implements OnInit {
  @Input() restaurantData: any;
  @Output() closeModal = new EventEmitter<void>();

  currentStep = 1;
  totalPrice: number = 0;

  orderData: {
    restaurantId: number;
    products: { name: string; quantity: number; price: number }[];
    address: string;
    confirmation: boolean;
    paymentMethod: string;
    orderDate: Date;
    phoneNumber: string;
    orderSubtotal: number;
    deliveryFee: number;
    promotionDiscount: number;
    totalAmount: number;
  } = {
    restaurantId: 1,
    products: [],
    address: 'Rruga e Durresit',
    confirmation: true,
    paymentMethod: 'Cash on Delivery',
    orderDate: new Date(),
    phoneNumber: '123-456-7890',
    orderSubtotal: 0,
    deliveryFee: 100,
    promotionDiscount: 50,
    totalAmount: 0,
  };

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    if (this.restaurantData) {
      this.orderData.restaurantId = this.restaurantData.id;
    }
  }

  onClose(): void {
    this.closeModal.emit();
  }

  nextStep() {
    if (this.currentStep === 2) {
      this.orderData.orderSubtotal = this.totalPrice;
      this.calculateTotalAmount();
    }
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  saveData<K extends keyof typeof this.orderData>(
    key: K,
    data: (typeof this.orderData)[K]
  ) {
    this.orderData[key] = data;

    if (key === 'confirmation' && data) {
      this.finishCheckout();
    }
  }

  onTotalPriceReceived(price: number) {
    this.totalPrice = price;
  }

  onTotalPriceFromMap(totalPrice: number): void {
    this.totalPrice = totalPrice; // Update total price
    console.log('Total price received from Map:', totalPrice); // Debug log
  }

  calculateTotalAmount() {
    this.orderData.totalAmount =
      this.orderData.orderSubtotal +
      this.orderData.deliveryFee -
      this.orderData.promotionDiscount;
  }
  finishCheckout() {
    this.calculateTotalAmount();
  
    const newOrder = {
      restaurantId: this.orderData.restaurantId,
      products: this.orderData.products,
      address: this.orderData.address,
      totalAmount: this.orderData.totalAmount,
      orderDate: new Date(),
    };
  
    // Add the order to the local array in OrderService
    this.orderService.addOrder(newOrder);
    console.log('Order added:', newOrder);
  
    this.onClose();
    alert('Order placed successfully!');
  }
  

}  

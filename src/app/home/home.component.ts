import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; 

import { OrderModalComponent } from "../order-modal/order-modal.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, OrderModalComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  restaurants: any[] = [
    {
      id: 1,
      name: 'Opa',
      image: 'assets/opa.jpg',
      cuisine: 'Greek Street',
      time: 30,
      address: 'Rruga Myslym Shyri, Tirana, Albania',
      categories: ['All', 'Pizza', 'Pasta','Risotto', 'Salad', 'Grill','Sweets'],
      dishes: [
        {
          name: 'Greek Salad',
          image: 'assets/opadish1.png',
          description: 'Fresh salad with feta cheese and olives',
          price: 500,
          category: 'Salad',
          quantity: 0,
        },
        {
          name: 'Chicken Souvlaki',
          image: 'assets/opadish1.png',
          description: 'Grilled chicken skewers with pita',
          price: 800,
          category: 'Grill',
          quantity: 0,
        },
      ],
    },
    {
      id: 2,
      name: ' KokaPul',
      image: 'assets/image.png',
      cuisine: 'Burger',
      time: 30,
      categories: ['Burger'],
    },
    {
      id: 3,
      name: 'Delibros',
      image: 'assets/delibros.jpg',
      cuisine: 'Fast Food',
      time: 30,
      categories: ['Fast Food'],
    },
    {
      id: 4,
      name: 'Chicos',
      image: 'assets/chicos.jpg',
      cuisine: 'Mexican',
      time: 30,
      categories: ['Mexican'],
    },
    {
      id: 5,
      name: 'Serendipity',
      image: 'assets/serendipity.jpg',
      cuisine: 'Sushi',
      time: 30,
      categories: ['Sushi'],
    },
    {
      id: 6,
      name: 'Amo Sushi',
      image: 'assets/amosushi.jpg',
      cuisine: 'Sushi',
      time: 30,
      categories: ['Sushi'],
    },
    {
      id: 7,
      name: ' So Sushi',
      image: 'assets/sosushi.jpg',
      cuisine: 'Pizza',
      time: 30,
      categories: ['Pizza'],
    },
    {
      id: 8,
      name: 'Deliziosa',
      image: 'assets/deliziosa.jpg',
      cuisine: 'Pizza',
      time: 30,
      categories: ['Pizza'],
    },
    {
      id: 9,
      name: 'Pa Pirunj',
      image: 'assets/papirunj.jpg',
      cuisine: 'Pasta',
      time: 30,
      categories: ['Pasta'],
    },
    {
      id: 10,
      name: 'Pa Pirunj',
      image: 'assets/papirunj.jpg',
      cuisine: 'Pasta',
      time: 30,
      categories: ['Pasta'],
    },
    

  ];
  
  selectedRestaurant: any = null;
  selectedCategory: string = 'All';
  filteredRestaurants = this.restaurants;
  isModalOpen: boolean = false;


  ngOnInit(): void {
    this.filteredRestaurants = this.restaurants;
  }

  openRestaurantModal(restaurant: any) {
    this.selectedRestaurant = restaurant;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.filteredRestaurants = 
      category === 'All' ? this.restaurants : this.restaurants.filter(
        restaurant => restaurant.categories.includes(category)
      );
  }

  increaseQuantity(dish: any) {
    dish.quantity = (dish.quantity || 0) + 1;
  }

  decreaseQuantity(dish: any) {
    if (dish.quantity && dish.quantity > 0) {
      dish.quantity--;
    }
  }

  getTotalQuantity(): number {
    return this.selectedRestaurant?.dishes.reduce((sum: number, dish: any) => sum + (dish.quantity || 0), 0) || 0;
  }

  getTotalAmount(): number {
    return this.selectedRestaurant?.dishes.reduce((sum: number, dish: any) => sum + ((dish.quantity || 0) * dish.price), 0) || 0;
  }

  checkout() {
    // Implement your checkout logic here
    console.log("Proceeding to checkout with selected items.");
    this.closeModal();
  }
}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,LoginModalComponent,SignupModalComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  
  isLoggedIn(): boolean {
    // Replace this with the actual logic to check if the user is logged in
    // For example, checking a token in local storage or a user service
    return !!localStorage.getItem('token'); // Assuming token presence means logged in
  }

  isCustomer(): boolean {
    // Replace this with actual logic to check if the logged-in user is a customer
    const role = localStorage.getItem('role');
    return role === 'customer';
  }

  isRestaurantOwner(): boolean {
    // Replace this with actual logic to check if the logged-in user is a restaurant owner
    const role = localStorage.getItem('role');
    return role === 'restaurant';
  }

  isAdmin(): boolean {
    // Replace this with actual logic to check if the logged-in user is an admin
    const role = localStorage.getItem('role');
    return role === 'admin';
  }

  logout() {
    // Logic to log out the user
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    // Optionally, navigate to the login page or home page
  }

  isLoginModalOpen = false;
  isSignupModalOpen = false;

  openLoginModal() {
    this.isLoginModalOpen = true;
  }

  closeLoginModal() {
    this.isLoginModalOpen = false;
  }
  openSignupModal() {
    this.isSignupModalOpen = true;
  }

  closeSignupModal() {
    this.isSignupModalOpen = false;
  }
}

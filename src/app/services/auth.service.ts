import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users = [
    { email: 'admin@example.com', password: 'admin123', role: 'admin', restaurantId: 1 },
    { email: 'user@example.com', password: 'user123', role: 'customer' },
  ];

  constructor(private router: Router) {}

  // Login function
  login(email: string, password: string): boolean {
    const user = this.users.find((u) => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('authToken', 'mock-token');
      localStorage.setItem('userRole', user.role);
      if (user.role === 'admin') {
        localStorage.setItem('restaurantId', String(user.restaurantId));
      }
      return true;
    }
    return false;
  }

  // Get the user's role
  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  // Get the restaurant ID (specific to admins)
  getRestaurantId(): string | null {
    return localStorage.getItem('restaurantId');
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  // Logout function
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']); // Redirect to login
  }
}

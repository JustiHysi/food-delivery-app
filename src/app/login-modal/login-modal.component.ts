import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
  imports: [FormsModule],
})
export class LoginModalComponent {
  email: string = '';
  password: string = '';
  isAdminLogin: boolean = false;

  @Output() close = new EventEmitter<void>();

  constructor(private authService: AuthService, private router: Router) {}

  closeModal() {
    this.close.emit();
  }

  login() {
    const success = this.authService.login(this.email, this.password);
    if (success) {
      const role = this.authService.getUserRole();
      if (role === 'admin') {
        this.router.navigate(['/restaurant-owner-dashboard']);
      } else {
        this.router.navigate(['/']);
      }
      this.closeModal();
    } else {
      alert('Invalid login credentials');
    }
  }

  toggleAdminLogin() {
    this.isAdminLogin = !this.isAdminLogin;
  }
}

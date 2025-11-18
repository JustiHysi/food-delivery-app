import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.scss'],
})
export class SignupModalComponent {
  @Output() close = new EventEmitter<void>();
  signupForm: FormGroup;
  isRestaurantOwner = false;

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  onSubmit() {
    const userData = { ...this.signupForm.value, role: this.isRestaurantOwner ? 'admin' : 'customer' };
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Signup successful!');
    this.close.emit();
  }

  toggleRole() {
    this.isRestaurantOwner = !this.isRestaurantOwner;
    this.signupForm.reset();
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuItem } from '../restaurant-owner-dashboard/menu-item.model';

@Component({
  selector: 'app-add-product-modal',
  standalone: true,
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.scss'],
  imports: [FormsModule],
})
export class AddProductModalComponent {
  @Input() product: MenuItem | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() saveProduct = new EventEmitter<MenuItem>();

  productForm: MenuItem = {
    id: '',
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
   
  };

  uploadedImage: File | null = null;

  ngOnInit() {
    if (this.product) {
      this.productForm = { ...this.product };
    }
  }

  save() {
    if (this.validateForm()) {
      if (this.uploadedImage) {
        const reader = new FileReader();
        reader.onload = () => {
          this.productForm.imageUrl = reader.result as string;
          this.saveProduct.emit(this.productForm);
          this.closeModal();
        };
        reader.readAsDataURL(this.uploadedImage);
      } else {
        this.saveProduct.emit(this.productForm);
        this.closeModal();
      }
    } else {
      alert('Please fill out all fields correctly.');
    }
  }

  validateForm(): boolean {
    return (
      this.productForm.name.trim() !== '' &&
      this.productForm.description.trim() !== '' &&
      this.productForm.price > 0 &&
      (this.productForm.imageUrl.trim() !== '' || this.uploadedImage !== null)
    );
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.uploadedImage = target.files[0];
    }
  }

  closeModal() {
    this.close.emit();
  }
}

import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  @Input() orderData: any;

  @Output() dataSaved = new EventEmitter<boolean>();
  @Output() back = new EventEmitter<void>();

  ngOnInit(): void {}

  checkoutConfirm() {
    this.dataSaved.emit(true); 
  }

  goBack() {
    this.back.emit();
  }
}

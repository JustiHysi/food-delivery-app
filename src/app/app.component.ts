import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component'; // Import NavbarComponent

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent], // Add NavbarComponent to imports
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // Fix typo: change `styleUrl` to `styleUrls`
})
export class AppComponent {
  title = 'food-delivery-app';
}

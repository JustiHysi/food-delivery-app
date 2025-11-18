import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @Input() totalPrice: number = 0; // Receive totalPrice from OrderModalComponent
  private map: L.Map | undefined;
  private marker: L.Marker | undefined;

  addressControl = new FormControl('');
  addressSuggestions: any[] = [];
  selectedAddress: string = ''; // Stores the selected or found address
  liveLocation: L.LatLng | null = null; // Stores the user's live location if found

  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  @Output() locationSelected = new EventEmitter<L.LatLng>();
  @Output() dataSaved = new EventEmitter<string>(); // Emitting the address
  @Output() next = new EventEmitter<void>();
  @Output() passTotalPrice = new EventEmitter<number>(); // Emitting total price
  @Output() back = new EventEmitter<void>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.initMap();
    this.setupAddressAutocomplete();
  }

  private initMap(): void {
    this.map = L.map(this.mapContainer.nativeElement).setView([41.3275, 19.8187], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    // Set a custom icon resembling the Google Maps marker
    this.marker = L.marker([41.3275, 19.8187], {
      draggable: true,
      icon: L.icon({
        iconUrl: 'assets/marker-icon.png', // Replace with the path to your custom marker icon
        iconSize: [30, 45],
        iconAnchor: [15, 45],
      }),
    }).addTo(this.map);

    // Update location on marker drag end
    this.marker.on('moveend', (event) => {
      const latLng = event.target.getLatLng();
      this.liveLocation = latLng; // Save marker's location
      this.reverseGeocode(latLng.lat, latLng.lng); // Fetch place name on marker drag
      this.locationSelected.emit(latLng);
    });
  }

  private setupAddressAutocomplete(): void {
    this.addressControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((value) => this.searchAddress(value || ''))
      )
      .subscribe((suggestions) => {
        this.addressSuggestions = suggestions;
      });
  }

  private searchAddress(query: string) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}`;
    return this.http.get<any[]>(url);
  }

  selectAddress(suggestion: any) {
    const lat = suggestion.lat;
    const lon = suggestion.lon;
    if (this.map && this.marker) {
      this.map.setView([lat, lon], 13);
      this.marker.setLatLng([lat, lon]);
      this.liveLocation = L.latLng(lat, lon); // Save selected location
      this.selectedAddress = suggestion.display_name; // Save selected address
      this.addressControl.setValue(suggestion.display_name, { emitEvent: false });
      this.addressSuggestions = [];
    }
  }

  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
  
          if (this.map && this.marker) {
            // Update map view and marker position
            this.map.setView([lat, lon], 15); // Adjust zoom level to focus better
            this.marker.setLatLng([lat, lon]);
            
            // Save live location
            this.liveLocation = L.latLng(lat, lon);
  
            // Fetch the address using reverse geocoding
            this.reverseGeocode(lat, lon);
  
            // Emit the new location
            this.locationSelected.emit(L.latLng(lat, lon));
          }
        },
        (error) => {
          console.error('Error finding location:', error);
          alert('Unable to fetch your current location. Please enable location services and try again.');
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  }
  
  private reverseGeocode(lat: number, lon: number): void {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
    this.http.get<any>(url).subscribe(
      (response) => {
        if (response && response.display_name) {
          this.selectedAddress = response.display_name; // Set the fetched address
          this.addressControl.setValue(response.display_name); // Update the input field
        }
      },
      (error) => {
        console.error('Reverse Geocoding Error:', error);
        alert('Unable to fetch address for the location. Please try again.');
      }
    );
  }
  

  saveAddress() {
    const address = this.selectedAddress || this.addressControl.value;
    if (address) {
      this.dataSaved.emit(address); // Emit the selected or input address
      this.passTotalPrice.emit(this.totalPrice); // Emit totalPrice when saving address
      this.next.emit(); // Proceed to the next step
    } else {
      alert('Please select or enter an address.');
    }
  }

  goBack() {
    this.back.emit();
  }
}

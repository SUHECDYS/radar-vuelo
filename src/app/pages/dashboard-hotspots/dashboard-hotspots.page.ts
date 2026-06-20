import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightService } from '../../core/services/flight.service'; // Asegura que la ruta a tu servicio sea correcta
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-dashboard-hotspots',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard-hotspots.page.html',
  styleUrls: ['./dashboard-hotspots.page.css']
})
export class DashboardHotspotsPage implements OnInit {
  listaAviones: any[] = [];
  cantidadVuelos: number = 0;

  constructor(private flightService: FlightService) {}

  ngOnInit(): void {
    this.flightService.getLiveFlights().subscribe({
      next: (data) => {
        // OpenSky devuelve los aviones en un array llamado 'states'
        this.listaAviones = data.states || [];
        this.cantidadVuelos = this.listaAviones.length;
        console.log('Aviones capturados en la región:', this.listaAviones);
      },
      error: (err) => {
        console.error('Error al conectar con el radar de OpenSky:', err);
      }
    });
  }
}
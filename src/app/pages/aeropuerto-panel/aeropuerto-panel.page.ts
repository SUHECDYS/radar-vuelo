import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FlightService } from '../../core/services/flight.service';

@Component({
  selector: 'app-aeropuerto-panel',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './aeropuerto-panel.page.html',
  styleUrls: ['./aeropuerto-panel.page.css']
})
export class AeropuertoPanelPage implements OnInit {
  codigoIcao: string = '';
  vuelosArribo: any[] = [];
  cargando: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private flightService: FlightService
  ) {}

  ngOnInit(): void {
    this.codigoIcao = this.route.snapshot.paramMap.get('icao') || '';
    
    this.flightService.getLiveFlights().subscribe({
      next: (data: any) => { 
        if (data && data.states) {
          const todosLosVuelos = data.states.map((est: any) => ({
            callsign: est[1] ? est[1].trim() : 'N/A',
            pais: est[2],
            altitud: est[7] !== null ? Math.round(est[7]) : 0,
            velocidad: est[9] !== null ? Math.round(est[9] * 3.6) : 0,
            enTierra: est[8]
          }));

          if (this.codigoIcao.toUpperCase() === 'SAEZ') {
            const locales = todosLosVuelos.filter((v: any) => 
              v.callsign.startsWith('ARG') || v.callsign.startsWith('FBZ')
            );
            this.vuelosArribo = locales.length > 0 ? locales.slice(0, 8) : todosLosVuelos.slice(0, 8);
          } else {
            this.vuelosArribo = todosLosVuelos.slice(0, 6);
          }
        }
        this.cargando = false;
      },
      error: (err: any) => { 
        console.error('Error al conectar con el radar:', err);
        this.cargando = false;
      }
    });
  }
}
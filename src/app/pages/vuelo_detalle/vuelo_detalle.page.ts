import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute} from '@angular/router';
import { FlightService } from '../../core/services/flight.service';

@Component({
  selector: 'app_vuelo_detalle', 
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vuelo_detalle.page.html',
  styleUrls: ['./vuelo_detalle.page.css']
})
export class VueloDetallePage implements OnInit {
  callsign: string = '';
  vuelo: any = null;
  cargando: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private flightService: FlightService
  ) {}

  ngOnInit(): void {
    this.callsign = this.route.snapshot.paramMap.get('id') || '';

    if (this.callsign) {
      this.flightService.getLiveFlights().subscribe({
        next: (data: any) => {
          if (data && data.states) {
            const avionEncontrado = data.states.find((est: any) => 
              est[1] && est[1].trim().toUpperCase() === this.callsign.toUpperCase()
            );

            if (avionEncontrado) {
              this.vuelo = {
                icao24: avionEncontrado[0],
                callsign: avionEncontrado[1].trim(),
                pais: avionEncontrado[2],
                longitud: avionEncontrado[5],
                latitud: avionEncontrado[6],
                altitud: avionEncontrado[7] !== null ? Math.round(avionEncontrado[7]) : 0,
                enTierra: avionEncontrado[8],
                velocidad: avionEncontrado[9] !== null ? Math.round(avionEncontrado[9] * 3.6) : 0,
                direccion: avionEncontrado[10] !== null ? Math.round(avionEncontrado[10]) : 0,
                ultimaActualizacion: new Date(avionEncontrado[4] * 1000)
              };
            }
          }
          this.cargando = false;
        },
        error: (err: any) => {
          console.error('Error al traer el detalle del vuelo:', err);
          this.cargando = false;
        }
      });
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FlightService } from '../../core/services/flight.service';

@Component({
  selector: 'app-vuelo-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vuelo-detalle.page.html',
  styleUrls: ['./vuelo-detalle.page.css']
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
    // Capturamos el parámetro del vuelo desde la URL
    this.callsign = this.route.snapshot.paramMap.get('id') || '';

    if (this.callsign) {
      this.flightService.getLiveFlights().subscribe({
        next: (data: any) => {
          if (data && data.states) {
            // Buscamos el avión que coincida con el callsign
            const avionEncontrado = data.states.find((est: any) => 
              est[1] && est[1].trim().toUpperCase() === this.callsign.toUpperCase()
            );

            if (avionEncontrado) {
              // Mapeamos la ficha técnica con todas las propiedades de OpenSky
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
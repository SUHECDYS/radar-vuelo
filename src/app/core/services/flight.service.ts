import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  // URL de OpenSky Network limitada geográficamente a nuestra región (Argentina, Chile, Uruguay, Sur de Brasil)
  private apiUrl = '/api-opensky/api/states/all?lamin=-55.0&lomin=-75.0&lamax=-22.0&lomax=-50.0';
  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los estados de vuelos activos en la región delimitada
   * @returns Un Observable con la respuesta cruda de la API
   */
  getLiveFlights(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
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

  getLiveFlights(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  getAirportArrivals(airportIcao: string): Observable<any> {
   
    const ahora = Math.floor(Date.now() / 1000);
    const haceDosHoras = ahora - (2 * 60 * 60);
    
    const url = `/api-opensky/api/flights/arrival?airport=${airportIcao}&begin=${haceDosHoras}&end=${ahora}`;
    return this.http.get<any>(url);
  }
}

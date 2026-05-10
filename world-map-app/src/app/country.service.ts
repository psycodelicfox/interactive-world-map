import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  getCountryInfo(countryCode: string): Observable<any> {
    const url = `http://api.worldbank.org/v2/country/${countryCode}?format=json`;
    return this.http.get(url);
  }

  // get additional info here:
  getAdditionalInfo(countryCode: string): Observable<any> {
    const url = `http://api.worldbank.org/v2/country/${countryCode}/indicator/SP.POP.TOTL?format=json`;
    return this.http.get(url);
  }

}

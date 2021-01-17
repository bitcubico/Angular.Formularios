import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {
  private _urlBase: string = 'https://restcountries.eu/rest/v2';

  constructor(private _httpClient: HttpClient) {  }

  getSpanishCountries(): Observable<Object>
  {
    let actionUrl = `lang/es`;
    return this.getQuery(actionUrl)
            .pipe( 
              map((data: any[]) => {
                console.log(data);
                return data.map(pais => ({nombre: pais.name, codigo: pais.alpha3Code}));
              }), 
              catchError((error) => {
                throw(error.error)
              })
            );
  }

  private getQuery(query: string): Observable<Object> {
    let actionUrl = `${this._urlBase}/${query}`;
    return this._httpClient.get(actionUrl);
  }
}

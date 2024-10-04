import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeticionesapiService {

  private tokenUrl = 'http://localhost:8080/realms/matriz/protocol/openid-connect/token';

  constructor(private http: HttpClient ) { }

  // Métodos para realizar la consulta a la API

  public getApi(url: string): Observable<any> {
    return this.http.get(url);
  }

  public postApi(url: string, datos: any): Observable<any> {
    return this.http.post(url, datos);
  }

  public putApi(url: string, datos: any): Observable<any> {
    return this.http.put(url, datos);
  }

  public deleteApi(url: string): Observable<any> {
    return this.http.delete(url);
  }
  getToken(username: string, password: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('username', username);
    body.set('password', password);
    body.set('client_id', "matriz-riesgo");
    body.set('client_secret', "GOX8CC3l57hUIS5GoTT9uq2EkC1085Z8");

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<any>(this.tokenUrl, body.toString(), { headers });
  }

}

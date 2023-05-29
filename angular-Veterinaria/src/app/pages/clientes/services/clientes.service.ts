import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '@app/shared/models/client.interface';
import { environment } from '@env/environment';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<Cliente[]> {
    return this.http
      .get<Cliente[]>(`${environment.API_URL}/clientes`)
      .pipe(catchError(this.handlerError));
  }

  getById(clienteId: number): Observable<Cliente> {
    return this.http
      .get<any>(`${environment.API_URL}/clientes/${clienteId}`)
      .pipe(catchError(this.handlerError));
  }

  new(cliente: Cliente): Observable<Cliente> {
    return this.http
      .post<Cliente>(`${environment.API_URL}/clientes`, cliente)
      .pipe(catchError(this.handlerError));
  }

  update(clienteId: number, cliente: Cliente): Observable<Cliente> {
    return this.http
      .patch<Cliente>(`${environment.API_URL}/clientes/${clienteId}`, cliente)
      .pipe(catchError(this.handlerError));
  }

  delete(clienteId: number): Observable<{}> {
    return this.http
      .delete<Cliente>(`${environment.API_URL}/clientes/${clienteId}`)
      .pipe(catchError(this.handlerError));
  }

  handlerError(error: { message: any }): Observable<never> {
    let errorMessage = 'Error unknown';
    if (error) {
      errorMessage = `Error ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}

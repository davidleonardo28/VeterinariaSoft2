import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '@app/shared/models/client.interface';
import { environment } from '@env/environment';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientesServiceFAKE {
  constructor(private http: HttpClient) { }

  getAll(): Observable<Cliente[]> {
    return new Observable((observer) => {
      observer.next(this.clientes);
    });
  }

  getById(clienteId: number): Observable<Cliente> {
    return this.http
      .get<any>(`${environment.API_URL}/clientes/${clienteId}`)
      .pipe(catchError(this.handlerError));
  }

  new(cliente: Cliente): Observable<Cliente> {
    return new Observable((observer) => {
      cliente.id_usuario = Math.max(...this.clientes.map(c => c.id_usuario)) + 1;
      this.clientes.push(cliente);
      observer.next(cliente);
    });
  }

  update(cliente: Cliente): Observable<Cliente> {
    return new Observable((observer) => {
      this.clientes.forEach(c => {
        if (c.id_usuario == cliente.id_usuario) {
          c.nombre = cliente.nombre;
          c.apellido = cliente.apellido;
          c.correo = cliente.correo;
          c.direccion = cliente.direccion;
          c.nombreMascota = cliente.nombreMascota;
        }
      });
      observer.next(cliente);
    });
  }

  delete(clienteId: number): Observable<{}> {
    return new Observable((observer) => {
      this.clientes = this.clientes.filter(c => c.id_usuario != clienteId);
      observer.next({});
    });
  }

  handlerError(error: { message: any }): Observable<never> {
    let errorMessage = 'Error unknown';
    if (error) {
      errorMessage = `Error ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  clientes: Cliente[] = [{
    id_usuario: 1,
    nombre: "Alex",
    apellido: "Diaz",
    correo: "Alex@gmail.com",
    nombreMascota: "Lukas",
  }, {
    id_usuario: 2,
    nombre: "Alejandro",
    apellido: "Hernandez",
    correo: "Alejandro@gmail.com",
    nombreMascota: "Rex",
  }, {
    id_usuario: 3,
    nombre: "Juana",
    apellido: "Perez",
    correo: "Juana@gmail.com",
    nombreMascota: "Lulu",
  }, {
    id_usuario: 4,
    nombre: "Marcos",
    apellido: "Gomez",
    correo: "Marcos@gmail.com",
    nombreMascota: "Rocky",
  }, {
    id_usuario: 5,
    nombre: "Luisa",
    apellido: "Bonza",
    correo: "Luisa@gmail.com",
    nombreMascota: "Luna",
  }]

}

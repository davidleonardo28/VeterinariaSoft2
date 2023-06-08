import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '@app/shared/models/client.interface';
import { environment } from '@env/environment';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientesServiceFAKE {

  constructor(private http: HttpClient) {
      var clientes = this.getLocalStorage();
      if (!clientes) this.setLocalStorage(this.clientes);
  }

  private setLocalStorage(clientes: Cliente[]) {
    localStorage.setItem("clientes", JSON.stringify(clientes));
  }

  private getLocalStorage() {
    return JSON.parse(localStorage.getItem("clientes"));
  }

  getAll(): Observable<Cliente[]> {
    return new Observable((observer) => {
      observer.next(this.getLocalStorage());
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
      this.clientes = this.getLocalStorage();
      this.clientes.push(cliente);
      this.setLocalStorage(this.clientes);
      observer.next(cliente);
    });
  }

  update(cliente: Cliente): Observable<Cliente> {
    return new Observable((observer) => {
      this.clientes = this.getLocalStorage();
      this.clientes.forEach(c => {
        if (c.id_usuario == cliente.id_usuario) {
          c.nombre = cliente.nombre;
          c.celular = cliente.celular;
          c.correo = cliente.correo;
          c.direccion = cliente.direccion;
          c.nombreMascota = cliente.nombreMascota;
        }
      });
      this.setLocalStorage(this.clientes);
      observer.next(cliente);
    });
  }

  delete(clienteId: number): Observable<{}> {
    return new Observable((observer) => {
      this.clientes = this.getLocalStorage();
      this.clientes = this.clientes.filter(c => c.id_usuario != clienteId);
      this.setLocalStorage(this.clientes);
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

  private clientes: Cliente[] = [{
    id_usuario: 1,
    nombre: "Alex Diaz",
    celular: "3214843547",
    correo: "Alex@gmail.com",
    direccion: "Calle 10 # 23 - 35",
    nombreMascota: "Lukas",
    image: '/assets/img/mascotas/dog.png',
  }, {
    id_usuario: 2,
    nombre: "Alejandro Hernandez",
    celular: "3167891345",
    correo: "Alejandro@gmail.com",
    direccion: "Carrera 32 # 15 - 86",
    nombreMascota: "Rex",
    image: '/assets/img/mascotas/minidog.png',
  }, {
    id_usuario: 3,
    nombre: "Juana Perez",
    celular: "3054561897",
    correo: "Juana@gmail.com",
    direccion: "Diagonal 85 # 15 - 61",
    nombreMascota: "Lulu",
    image: '/assets/img/mascotas/cat.png',
  }, {
    id_usuario: 4,
    nombre: "Marcos Gomez",
    celular: "3246878912",
    correo: "Marcos@gmail.com",
    direccion: "Avenida Siempreviva 742",
    nombreMascota: "Rocky",
    image: '/assets/img/mascotas/beagle.png',
  }, {
    id_usuario: 5,
    nombre: "Luisa Bonza",
    celular: "314789651",
    correo: "Luisa@gmail.com",
    direccion: "Transversal 51 # 75 - 42",
    nombreMascota: "Luna",
    image: '/assets/img/mascotas/minicat.png',
  }, {
    id_usuario: 6,
    nombre: "Maria Rodriguez",
    celular: "3215564684",
    correo: "Maria@gmail.com",
    direccion: "Calle 158 # 102 - 86 T3 Apto 303",
    nombreMascota: "Kira",
    image: '/assets/img/mascotas/chanda.png',
  }]

}

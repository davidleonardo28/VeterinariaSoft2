import { Component, OnInit } from '@angular/core';
import { ClientesServiceFAKE } from '../admin/clientes/services/clientesFAKE.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  imageObject: Array<object> = [];

  constructor(
    private clienteService: ClientesServiceFAKE
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  private getAll() {
    this.clienteService.getAll().subscribe({
      next: (clientes) => {
        this.imageObject = clientes.map(c => {
          return {
            image: c.image,
            thumbImage: c.image,
            title: c.nombreMascota,
            alt: c.nombreMascota
          }
        });
      }
    });
  }

}

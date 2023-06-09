import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '@app/shared/models/client.interface';
import { switchMap } from 'rxjs';
import { ClientesServiceFAKE } from '../admin/clientes/services/clientesFAKE.service';

@Component({
  selector: 'app-admin',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  clientes: Cliente[];
  public cliente: Cliente;

  constructor(private route: ActivatedRoute,
    private clienteService: ClientesServiceFAKE,
    private router: Router
  ) {
    this.obtenerClientes()
  }

  private obtenerClientes() {
    this.clienteService.getAll().subscribe({
      next: (clientes) => {
        this.clientes = clientes;
      }
    });
  }

  ngOnInit(): void {
    // var correo = this.route.snapshot.paramMap.get('correo');
    var correo = localStorage.getItem("correo");
    this.cliente = this.clientes.find(c => c.correo == correo);
    if (!this.cliente) {
      this.router.navigate(['']);
    }
  }

}

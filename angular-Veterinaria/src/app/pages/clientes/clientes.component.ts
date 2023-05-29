import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalFormClientComponent } from './components/modal/modal-form-cliente.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ClientesServiceFAKE } from './services/clientesFAKE.service';
import { MatSort } from '@angular/material/sort';
import { Cliente } from '@app/shared/models/client.interface';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements AfterViewInit, OnInit {
  dataSource = new MatTableDataSource();
  clientes: Cliente[] = [];

  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog,
    private clienteService: ClientesServiceFAKE,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  private getAll() {
    this.clienteService.getAll().subscribe({
      next: (clientes) => {
        this.dataSource.data = clientes;
        this.clientes = clientes;
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  add() {
    let dialogRef = this.dialog.open(ModalFormClientComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAll();
      if (result) this.snackBar.open('Cliente creado exitosamente.', null, { verticalPosition: "top", horizontalPosition: "right", panelClass: ["text-white", "bg-success"] });
    });
  }

  edit(cliente: Cliente) {
    let dialogRef = this.dialog.open(ModalFormClientComponent, {
      data: cliente,
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAll();
      if (result) this.snackBar.open('Cliente editado exitosamente.', null, { verticalPosition: "top", horizontalPosition: "right", panelClass: ["text-white", "bg-success"] });
    });
  }

  delete(cliente: Cliente) {
    if (window.confirm('¿Esta seguro de eliminar a este cliente?')) {
      this.clienteService.delete(cliente.id_usuario).subscribe({
        next: () => {
          this.getAll();
          this.snackBar.open('Cliente borrado exitosamente.', null, { verticalPosition: "top", horizontalPosition: "right", panelClass: ["text-white", "bg-success"] });
        }
      });
    }
  }

}

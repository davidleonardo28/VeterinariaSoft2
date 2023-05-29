import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesComponent } from './clientes.component';
import { MaterialModule } from '@app/material.module';
import { ModalFormClientComponent } from './components/modal/modal-form-cliente.component';

@NgModule({
  imports: [
    CommonModule,
    ClientesRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [
    ClientesComponent,
    ModalFormClientComponent
  ],
})
export class ClientesModule {}

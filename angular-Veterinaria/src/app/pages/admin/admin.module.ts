import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MaterialModule } from '@app/material.module';
import { ModalComponent } from './components/modal/modal.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ModalFormClientComponent } from './clientes/components/modal/modal-form-cliente.component';

@NgModule({
  declarations: [
    AdminComponent,
    ModalComponent,
    ClientesComponent,
    ModalFormClientComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class AdminModule {}

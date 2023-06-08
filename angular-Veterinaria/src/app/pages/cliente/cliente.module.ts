import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/material.module';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteComponent } from './cliente.component';

@NgModule({
  imports: [
    CommonModule,
    ClienteRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [
    ClienteComponent
  ],
})
export class ClienteModule {}

import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@app/material.module';
import { ClienteFormComponent } from './cliente/form/cliente-form.component';
import { ClienteListComponent } from './cliente/list/cliente-list.component';

@NgModule({
  declarations: [
    ClienteFormComponent,
    ClienteListComponent,
  ],
  exports: [
    ClienteFormComponent,
    ClienteListComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class ComponentsModule {}

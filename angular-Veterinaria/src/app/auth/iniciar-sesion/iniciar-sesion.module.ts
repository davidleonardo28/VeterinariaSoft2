import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IniciarSesionRoutingModule } from './iniciar-sesion-routing.module';
import { IniciarSesionComponent } from './iniciar-sesion.component';
import { MaterialModule } from '@app/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    IniciarSesionComponent
  ],
  imports: [
    CommonModule,
    IniciarSesionRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class IniciarSesionModule { }

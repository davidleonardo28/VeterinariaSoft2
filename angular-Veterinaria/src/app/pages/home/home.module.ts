import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { AdminModule } from '../admin/admin.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgImageSliderModule,
    AdminModule
  ], providers: [
    
  ]
})
export class HomeModule { }

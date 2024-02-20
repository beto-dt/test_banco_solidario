import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import {SliderbarComponent} from "./sliderbar.component";



@NgModule({
  declarations: [
    SliderbarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ]
})
export class SliderBarModule { }

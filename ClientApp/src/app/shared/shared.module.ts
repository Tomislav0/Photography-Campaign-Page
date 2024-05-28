import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { LazyLoadDirective } from '../directives/lazy-load.directive';

@NgModule({
  declarations: [
    HeaderComponent,
    LazyLoadDirective
  ],
  imports: [CommonModule, FormsModule, ],
  exports: [FormsModule, ReactiveFormsModule, HeaderComponent, LazyLoadDirective],
})
export class SharedModule { }

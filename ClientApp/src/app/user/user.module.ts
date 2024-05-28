import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home/home.component";
import { UserRoutingModule } from "./user-routing.module";
import { SharedModule } from "../shared";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MAT_DATE_LOCALE, MatNativeDateModule } from "@angular/material/core";
import { MatInputModule  } from "@angular/material/input";
import { MatIconModule  } from "@angular/material/icon";
import { ApplicationFormComponent } from './application-form/application-form.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
	declarations: [
		HomeComponent,
  ApplicationFormComponent
	],
	imports: [CommonModule, UserRoutingModule, FormsModule, ReactiveFormsModule, SharedModule, MatDatepickerModule, MatFormFieldModule,MatNativeDateModule,MatInputModule, MatIconModule, MatSnackBarModule],
	exports: [],
	providers:[
		{provide: MAT_DATE_LOCALE, useValue: 'hr-HR'},
	]
})
export class UserModule {}

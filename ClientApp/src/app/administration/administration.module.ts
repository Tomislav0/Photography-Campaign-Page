import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { AdministrationRoutingModule } from "./administration-routing.module";
import { LoginComponent } from "./login/login.component";
import { SharedModule } from "../shared";
import { AdminPageComponent } from "./admin-page";

@NgModule({
	declarations: [
		LoginComponent,
		AdminPageComponent,
	],
	imports: [
		CommonModule,
		AdministrationRoutingModule,
		SharedModule,
	],
	providers: [DatePipe],
})
export class AdministrationModule {}

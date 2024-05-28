import { Component } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { AuthGuard } from "./helpers/auth.guard";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
})
export class AppComponent {
	public isLogin: boolean = true;
	public isAdmin = false;
	constructor(private router: Router, private authGuard: AuthGuard) {
		this.isAdmin = this.authGuard.isAdmin();
		this.router.events.subscribe((event: any) => {
			if (event instanceof NavigationEnd) {
				if (event.url === "/admin/login") {
					this.isLogin = true;
				} else {
					this.isLogin = false;
				}
			}
		});
	}

	public changeAdminStatus(status: boolean) {
		this.isAdmin = status;
	}
}

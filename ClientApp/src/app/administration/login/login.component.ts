import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.css"],
})
export class LoginComponent {
	public loginForm = new FormGroup({
		email: new FormControl("", Validators.required),
		password: new FormControl("", Validators.required),
	});
	
	constructor(private authService: AuthService, private router: Router) {}

	public submit() {
		if (this.loginForm.invalid) return;
		const formData = this.loginForm.getRawValue();

		this.authService.login(formData).subscribe(
			(result) => {
				alert("Dobrodošli nazad");
				localStorage.setItem("auth_token", result.accessToken);
				this.authService.authorizedSubject.next(true);
				this.router.navigateByUrl("admin");
			},
			(error) => {
				if (error.status == 401) {
					alert("Neispravan email ili lozinka");
				}
			}
		);
	}
}

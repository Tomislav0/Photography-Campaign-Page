import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatCalendarCellClassFunction } from "@angular/material/datepicker";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { map } from "rxjs";
import { AppointmentService } from "src/app/services/appointment.service";

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.css"],
})
export class HomeComponent {
	public isLoaded = false;
	public reservedDates: Date[] = [];
	public minDate = new Date(2024, 6, 1)
	public maxDate = new Date(2024, 6, 31)

	myFilter = (d: Date | null): boolean => {
		const calendarDate = (d || new Date())

		return !this.reservedDates.some(s => this.areDatesEqual(s, calendarDate)) && d?.getMonth() === 6;
	};

	public dateClass: MatCalendarCellClassFunction<Date> = (cellDate: Date, view: any) => {
		if (view === 'month') {

			return !this.reservedDates.some(s => this.areDatesEqual(s, cellDate)) ? 'example-custom-date-class' : '';
		}

		return '';
	};

	private areDatesEqual(date1: Date, date2: Date): boolean {
		return date1.getMonth() === date2.getMonth() &&
			date1.getDate() === date2.getDate();
	}

	public appointmentFrom = new FormGroup({
		name: new FormControl("", Validators.required),
		email: new FormControl("", Validators.required),
		phoneNumber: new FormControl("", Validators.required),
		date: new FormControl("2024-07-1T00:00:00", Validators.required),
		description: new FormControl("", Validators.required),
	});

	constructor(public appointmentService: AppointmentService, public router: Router, public snackBar: MatSnackBar) {
		this.isLoaded = true;
		this.appointmentService.getDates().pipe(map(s => s.map(m => new Date(m)))).subscribe(result => {
			this.reservedDates = result;
			console.log(this.reservedDates)
		})
	}

	public submit() {
		if (this.appointmentFrom.invalid) { this.snackBar.open('Unesite ispravne podatke', undefined, {
			duration: 30000,
			horizontalPosition: 'center',
			verticalPosition: 'top',
		  }); return; }
		this.snackBar.open('Zahtjev u obradi', undefined, {
			duration: 30000,
			horizontalPosition: 'center',
			verticalPosition: 'top',
		  });
		const formData = this.appointmentFrom.getRawValue();
		const date = new Date(formData.date as string)
		date.setDate(date.getDate() + 1);
		formData.date = date.toISOString()
		this.appointmentService.createAppointment(formData).subscribe(
			(result) => {
				this.snackBar.open('Zahtjev je zaprimljen!', undefined, {
					duration: 3000,
					horizontalPosition: 'center',
					verticalPosition: 'top',
				  });
				this.appointmentService.getDates().pipe(map(s => s.map(m => new Date(m)))).subscribe(result => {
					this.reservedDates = result;
					console.log(this.reservedDates)
				})
			}
		);
	}

}

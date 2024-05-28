import { Component, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { AppointmentService } from "src/app/services/appointment.service";

@Component({
	selector: "app-admin-page",
	templateUrl: "./admin-page.component.html",
	styleUrls: ["./admin-page.component.css"],
})
export class AdminPageComponent {
	public appointments: any[] = [];
	public activeModal!: NgbModalRef;

	public selectedAppointment: any = {}

	public appointmentFrom = new FormGroup({
		name: new FormControl({ value: '', disabled: true }, Validators.required),
		email: new FormControl({ value: '', disabled: true }, Validators.required),
		phoneNumber: new FormControl({ value: '', disabled: true }, Validators.required),
		date: new FormControl({ value: '', disabled: true }, Validators.required),
		description: new FormControl({ value: '', disabled: true }, Validators.required),
		isApproved: new FormControl({ value: '', disabled: true }, Validators.required),
		id: new FormControl({ value: '', disabled: true }, Validators.required),
		createdAt: new FormControl({ value: '', disabled: true }, Validators.required),
		status: new FormControl("", Validators.required),
	});

	@ViewChild('modal')
	public modalTemplate: any;

	constructor(public appointmentService: AppointmentService, public router: Router, public modal: NgbModal) {
		this.getAppointments();
	}

	private getAppointments(){
		this.appointmentService.getAppointments().subscribe(r => {
			this.appointments = r;
		})
	}
	openModal(appointment: any) {
		this.selectedAppointment = appointment;
		
		this.selectedAppointment.status = appointment.isApproved == null ? 'Nije pregledano': (appointment.isApproved ? 'Odobreno' : 'Odbijeno');
		this.appointmentFrom.setValue(appointment)
		this.activeModal = this.modal.open(this.modalTemplate);
	}

	approve() {
		this.appointmentService.approveAppointment(this.selectedAppointment.id).subscribe(r => {
			alert('approved');
			this.activeModal?.close()
			this.getAppointments();
		})
	}

	decline() {
		this.appointmentService.declineAppointment(this.selectedAppointment.id).subscribe(r => {
			alert('declined');
			this.activeModal?.close()
			this.getAppointments();
		})
	}

	delete() {
		this.appointmentService.deleteAppointment(this.selectedAppointment.id).subscribe(r => {
			alert('deleted');
			this.activeModal?.close()
			this.getAppointments();
		})
	}
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConfirmRegistrationComponent } from './confirm-registration.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		ToastrModule,
	],
	declarations: [ConfirmRegistrationComponent],
})
export class ConfirmRegistrationModule {}

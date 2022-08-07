import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegisterSecondStepComponent } from './pages/register-second-step/register-second-step.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		BsDatepickerModule.forRoot(),
		ToastrModule.forRoot(),
	],
	declarations: [RegisterComponent, RegisterSecondStepComponent],
})
export class RegisterModule {}

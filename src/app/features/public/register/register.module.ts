import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegisterSecondStepComponent } from './pages/register-second-step/register-second-step.component';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		ToastrModule.forRoot(),
		SharedModule,
	],
	declarations: [RegisterComponent, RegisterSecondStepComponent],
})
export class RegisterModule {}

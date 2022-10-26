import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ResetPasswordFormComponent } from './components/reset-password-form/reset-password-form.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPasswordApiService } from './services/reset-password-api.service';

@NgModule({
	imports: [
		ResetPasswordRoutingModule,
		ReactiveFormsModule,
		RouterModule,
		SharedModule,
	],
	declarations: [ResetPasswordComponent, ResetPasswordFormComponent],
	providers: [ResetPasswordApiService],
})
export class ResetPasswordModule {}

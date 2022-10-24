import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { RecoverPasswordComponent } from './pages/recover-password/recover-password.component';
import { RecoverPasswordFormComponent } from './components/recover-password-form/recover-password-form.component';
import { RecoverPasswordSuccessComponent } from './components/recover-password-success/recover-password-success.component';
import { RecoverPasswordRoutingModule } from './recover-password-routing.module';
import { RecoverPasswordApiService } from './services/recover-password-api.service';

@NgModule({
	imports: [
		RecoverPasswordRoutingModule,
		ReactiveFormsModule,
		RouterModule,
		SharedModule,
	],
	declarations: [
		RecoverPasswordComponent,
		RecoverPasswordFormComponent,
		RecoverPasswordSuccessComponent,
	],
	providers: [RecoverPasswordApiService],
})
export class RecoverPasswordModule {}

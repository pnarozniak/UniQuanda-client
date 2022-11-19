import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicComponent } from './public.component';
import { PublicRoutingModule } from './public-routing.module';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { ConfirmRegistrationModule } from './confirm-registration/confirm-registration.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { ConfirmEmailModule } from './confirm-email/confirm-email.module';

@NgModule({
	imports: [
		CommonModule,
		PublicRoutingModule,
		LoginModule,
		RegisterModule,
		ConfirmRegistrationModule,
		UserProfileModule,
		ConfirmEmailModule,
	],
	declarations: [PublicComponent],
})
export class PublicModule {}

import { EmailsContentComponent } from './components/emails-content/emails-content.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainEmailContentComponent } from './components/main-email-content/main-email-content.component';
import { SecuritySettingsComponent } from './security-settings.component';
import { SecuritySettingsApiService } from './services/security-settings-api.service';
import { ExtraEmailContentComponent } from './components/extra-email-content/extra-email-content.component';
import { AddExtraEmailFormComponent } from './components/add-extra-email-form/add-extra-email-form.component';
import { PasswordContentComponent } from './components/password-content/password-content.component';
import { UpdatePasswordFormComponent } from './components/update-password-form/update-password-form.component';
import { UpdateMainEmailFormComponent } from './components/update-main-email-form/update-main-email-form.component';

@NgModule({
	declarations: [
		SecuritySettingsComponent,
		MainEmailContentComponent,
		EmailsContentComponent,
		ExtraEmailContentComponent,
		AddExtraEmailFormComponent,
		PasswordContentComponent,
		UpdatePasswordFormComponent,
		UpdateMainEmailFormComponent,
	],
	imports: [CommonModule, RouterModule, SharedModule],
	providers: [SecuritySettingsApiService],
})
export class SecuritySettingsModule {}

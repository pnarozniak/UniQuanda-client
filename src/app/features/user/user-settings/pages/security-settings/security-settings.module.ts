import { EmailsContentComponent } from './components/emails-content/emails-content.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainEmailContentComponent } from './components/main-email-content/main-email-content.component';
import { SecuritySettingsComponent } from './security-settings.component';
import { SecuritySettingsApiService } from './services/security-settings-api.service';
import { AddExtraEmailFormComponent } from './components/add-extra-email-form/add-extra-email-form.component';
import { PasswordContentComponent } from './components/password-content/password-content.component';
import { UpdatePasswordFormComponent } from './components/update-password-form/update-password-form.component';
import { UpdateMainEmailFormComponent } from './components/update-main-email-form/update-main-email-form.component';
import { DeleteExtraEmailFormComponent } from './components/delete-extra-email-form/delete-extra-email-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		SecuritySettingsComponent,
		MainEmailContentComponent,
		EmailsContentComponent,
		DeleteExtraEmailFormComponent,
		AddExtraEmailFormComponent,
		PasswordContentComponent,
		UpdatePasswordFormComponent,
		UpdateMainEmailFormComponent,
	],
	imports: [CommonModule, RouterModule, SharedModule, ReactiveFormsModule],
	providers: [SecuritySettingsApiService],
})
export class SecuritySettingsModule {}

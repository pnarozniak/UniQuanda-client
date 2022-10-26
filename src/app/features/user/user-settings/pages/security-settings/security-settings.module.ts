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

@NgModule({
	declarations: [
		SecuritySettingsComponent,
		MainEmailContentComponent,
		EmailsContentComponent,
		ExtraEmailContentComponent,
		AddExtraEmailFormComponent,
		PasswordContentComponent,
	],
	imports: [CommonModule, RouterModule, SharedModule],
	providers: [SecuritySettingsApiService],
})
export class SecuritySettingsModule {}

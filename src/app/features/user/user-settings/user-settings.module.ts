import { ProfileSettingsModule } from './pages/profile-settings/profile-settings.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserSettingsRoutingModule } from './user-settings-routing.module';
import { SettingsNavigationComponent } from './components/settings-navigation/settings-navigation.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { SecuritySettingsModule } from './pages/security-settings/security-settings.module';
import { UserSettingsComponent } from './user-settings.component';

@NgModule({
	imports: [
		CommonModule,
		UserSettingsRoutingModule,
		RouterModule,
		ProfileSettingsModule,
		SharedModule,
		SecuritySettingsModule,
	],
	declarations: [SettingsNavigationComponent, UserSettingsComponent],
})
export class UserSettingsModule {}

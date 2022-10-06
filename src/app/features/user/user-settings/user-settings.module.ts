import { ProfileSettingsModule } from './pages/profile-settings/profile-settings.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserSettingsRoutingModule } from './user-settings-routing.module';
import { UserSettingsComponent } from './user-settings.component';
import { SettingsNavigationComponent } from './components/settings-navigation/settings-navigation.component';
import { RouterModule } from '@angular/router';

@NgModule({
	imports: [
		CommonModule,
		UserSettingsRoutingModule,
		RouterModule,
		ProfileSettingsModule,
	],
	declarations: [UserSettingsComponent, SettingsNavigationComponent],
})
export class UserSettingsModule {}

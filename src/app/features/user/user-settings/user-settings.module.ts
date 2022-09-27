import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserSettingsRoutingModule } from './user-settings-routing.module';
import { UserSettingsDataModule } from './user-settings-data/user-settings-data.module';
import { UserSettingsComponent } from './user-settings.component';
import { SettingsNavigationComponent } from './settings-navigation/settings-navigation.component';
import { RouterModule } from '@angular/router';

@NgModule({
	imports: [
		CommonModule,
		UserSettingsRoutingModule,
		UserSettingsDataModule,
		RouterModule,
	],
	declarations: [UserSettingsComponent, SettingsNavigationComponent],
})
export class UserSettingsModule {}

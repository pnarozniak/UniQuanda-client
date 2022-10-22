import { UserSettingsModule } from './user-settings/user-settings.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
	imports: [CommonModule, UserRoutingModule, UserSettingsModule],
})
export class UserModule {}

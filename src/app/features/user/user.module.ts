import { UserSettingsModule } from './user-settings/user-settings.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { AskQuestionModule } from './ask-question/ask-question.module';
import { PremiumModule } from '../premium/premium.module';

@NgModule({
	imports: [
		CommonModule,
		UserRoutingModule,
		UserSettingsModule,
		AskQuestionModule,
		PremiumModule,
	],
})
export class UserModule {}

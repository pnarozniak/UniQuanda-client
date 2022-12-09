import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { UserProfileComponent } from './user-profile.component';
import { HeaderComponent } from './components/header/header.component';
import { StatsComponent } from './components/header/stats/stats.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileLeftDataComponent } from './components/left-data/left-data.component';
import { ProfileNavigationComponent } from './components/profile-navigation/profile-navigation.component';
import { MatTabsModule } from '@angular/material/tabs';
import { QuestionsProfileComponent } from './pages/questions-profile/questions-profile.component';
import { AnswersProfileComponent } from './pages/answers-profile/answers-profile.component';
import { LeftDataProfileComponent } from './pages/left-data-profile/left-data-profile.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		UserProfileRoutingModule,
		SharedModule,
		MatTooltipModule,
		ToastrModule.forRoot(),
		BsDropdownModule.forRoot(),
		MatTabsModule,
	],
	declarations: [
		UserProfileComponent,
		HeaderComponent,
		StatsComponent,
		ProfileLeftDataComponent,
		ProfileNavigationComponent,
		QuestionsProfileComponent,
		AnswersProfileComponent,
		LeftDataProfileComponent,
	],
})
export class UserProfileModule {}

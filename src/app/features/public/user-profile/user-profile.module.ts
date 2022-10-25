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
import { UserDataComponent } from './components/user-data/user-data.component';
import { ProfileNavigationComponent } from './components/profile-navigation/profile-navigation.component';
import { MatTabsModule } from '@angular/material/tabs';
import { QuestionsProfileComponent } from './pages/questions-profile/questions-profile.component';
import { AnswersProfileComponent } from './pages/answers-profile/answers-profile.component';
import { UserDataProfileComponent } from './pages/user-data-profile/user-data-profile.component';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		UserProfileRoutingModule,
		SharedModule,
		ToastrModule.forRoot(),
		BsDropdownModule.forRoot(),
		MatTabsModule,
	],
	declarations: [
		UserProfileComponent,
		HeaderComponent,
		StatsComponent,
		UserDataComponent,
		ProfileNavigationComponent,
		QuestionsProfileComponent,
		AnswersProfileComponent,
		UserDataProfileComponent,
	],
})
export class UserProfileModule {}

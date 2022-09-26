import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { UserProfileComponent } from './user-profile.component';
import { HeaderComponent } from './components/header/header.component';
import { StatsComponent } from './components/header/stats/stats.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		ToastrModule.forRoot(),
		BsDropdownModule.forRoot(),
	],
	declarations: [UserProfileComponent, HeaderComponent, StatsComponent],
})
export class UserProfileModule {}

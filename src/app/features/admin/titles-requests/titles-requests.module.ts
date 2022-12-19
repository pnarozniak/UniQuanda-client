import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitlesRequestsComponent } from './titles-requests.component';
import { TitlesRequestRoutingModule } from './titles-requests.routing.module';
import { RouterModule } from '@angular/router';
import { SingleTitleRequestComponent } from './components/single-title-request/single-title-request.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
	imports: [
		CommonModule,
		TitlesRequestRoutingModule,
		RouterModule,
		SharedModule,
		FormsModule,
		MatSelectModule,
	],
	declarations: [TitlesRequestsComponent, SingleTitleRequestComponent],
})
export class TitlesRequestsModule {}

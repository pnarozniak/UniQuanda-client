import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { QuestionSortingComponent } from './components/question-sorting/question-sorting.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { QuestionBoxComponent } from './components/question-box/question-box.component';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { HomeRoutingModule } from './home.routing.module';
@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		FormsModule,
		RouterModule,
		MatMenuModule,
		HomeRoutingModule,
	],
	declarations: [HomeComponent, QuestionSortingComponent, QuestionBoxComponent],
})
export class HomeModule {}

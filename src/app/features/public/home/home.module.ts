import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { QuestionSortingComponent } from './components/question-sorting/question-sorting.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
	imports: [CommonModule, SharedModule],
	declarations: [HomeComponent, QuestionSortingComponent],
})
export class HomeModule {}

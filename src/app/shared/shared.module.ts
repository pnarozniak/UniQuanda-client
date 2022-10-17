import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ContextDirective } from './directives/context.directive';
import { LoadingDirective } from './directives/loading.directive';
import { ThemeDirective } from './directives/theme.directive';

@NgModule({
	declarations: [
		ThemeDirective,
		PaginatorComponent,
		LoadingDirective,
		ContextDirective,
	],
	imports: [CommonModule, FormsModule],
	exports: [
		CommonModule,
		ThemeDirective,
		PaginatorComponent,
		LoadingDirective,
		ContextDirective,
	],
})
export class SharedModule {}

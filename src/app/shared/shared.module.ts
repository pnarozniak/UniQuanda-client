import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ThemeDirective } from './directives/theme.directive';

@NgModule({
	declarations: [ThemeDirective, PaginatorComponent],
	imports: [CommonModule, FormsModule],
	exports: [CommonModule, ThemeDirective, PaginatorComponent],
})
export class SharedModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ContextDirective } from './directives/context.directive';
import { LoadingDirective } from './directives/loading.directive';
import { ThemeDirective } from './directives/theme.directive';
import { InputComponent } from './components/input/input.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './components/button/button.component';
import { IconComponent } from './components/icon/icon.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { PLDatePickerAdapter } from './components/date-picker/pl-date-picker-adapter';
import { FormsValidationService } from './services/forms-validation.service';
import { TextareaComponent } from './components/textarea/textarea.component';
import { NotImplementedDirective } from './directives/not-implemented.directive';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TagComponent } from './components/tag/tag.component';

const sharedComponents = [
	InputComponent,
	ButtonComponent,
	IconComponent,
	DatePickerComponent,
	PaginatorComponent,
	TextareaComponent,
	TagComponent,
];

const sharedModules = [CommonModule];

const sharedDirectives = [
	ThemeDirective,
	LoadingDirective,
	ContextDirective,
	NotImplementedDirective,
];

@NgModule({
	imports: [
		sharedModules,
		MatInputModule,
		FormsModule,
		ReactiveFormsModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatTooltipModule,
	],
	declarations: [sharedDirectives, sharedComponents],
	exports: [sharedDirectives, sharedModules, sharedComponents],
	providers: [
		FormsValidationService,
		{
			provide: DateAdapter,
			useClass: PLDatePickerAdapter,
		},
		{
			provide: MAT_DATE_LOCALE,
			useValue: 'pl-PL',
		},
	],
})
export class SharedModule {}

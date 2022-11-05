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
import {
	DateAdapter,
	MatNativeDateModule,
	MatRippleModule,
} from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { PLDatePickerAdapter } from './components/date-picker/pl-date-picker-adapter';
import { FormsValidationService } from './services/forms-validation.service';
import { TextareaComponent } from './components/textarea/textarea.component';
import { NotImplementedDirective } from './directives/not-implemented.directive';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RecaptchaTermsComponent } from './components/recaptcha-terms/recaptcha-terms.component';
import { TagComponent } from './components/tag/tag.component';
import { DialogBaseComponent } from './components/dialogs/dialog-base/dialog-base.component';
import { ReportDialogComponent } from './components/dialogs/report-dialog/report-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReportDialogStep1Component } from './components/dialogs/report-dialog/report-dialog-step-1/report-dialog-step-1.component';
import { ReportDialogStep2Component } from './components/dialogs/report-dialog/report-dialog-step-2/report-dialog-step-2.component';
import { UniquandaLineComponent } from './components/uniquanda-line/uniquanda-line.component';
import { CreateAnAccountDialogComponent } from './components/dialogs/create-an-account-dialog/create-an-account-dialog.component';
import { RouterModule } from '@angular/router';

const sharedComponents = [
	InputComponent,
	ButtonComponent,
	IconComponent,
	DatePickerComponent,
	PaginatorComponent,
	TextareaComponent,
	RecaptchaTermsComponent,
	TagComponent,
	ReportDialogComponent,
	UniquandaLineComponent,
	CreateAnAccountDialogComponent,
];

const privateComponents = [
	DialogBaseComponent,
	ReportDialogStep1Component,
	ReportDialogStep2Component,
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
		MatDialogModule,
		MatRippleModule,
		RouterModule,
	],
	declarations: [sharedDirectives, sharedComponents, privateComponents],
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

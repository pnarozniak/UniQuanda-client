import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSettingsDataComponent } from './user-settings-data.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CustomDropzonePreviewComponent } from '../components/custom-dropzone-preview/custom-dropzone-preview.component';
import { DragAndDropImageInputComponent } from '../components/drag-and-drop-image-input/drag-and-drop-image-input.component';
import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
	declarations: [
		UserSettingsDataComponent,
		DragAndDropImageInputComponent,
		CustomDropzonePreviewComponent,
	],
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		BsDatepickerModule.forRoot(),
		NgxDropzoneModule,
	],
})
export class UserSettingsDataModule {}

import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ProfileSettingsComponent } from './profile-settings.component';
import { CustomDropzonePreviewComponent } from './components/custom-dropzone-preview/custom-dropzone-preview.component';
import { DragAndDropImageInputComponent } from './components/drag-and-drop-image-input/drag-and-drop-image-input.component';

@NgModule({
	declarations: [
		ProfileSettingsComponent,
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
		SharedModule,
	],
})
export class ProfileSettingsModule {}

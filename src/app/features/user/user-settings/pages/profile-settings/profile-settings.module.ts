import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ProfileSettingsComponent } from './profile-settings.component';
import { CustomDropzonePreviewComponent } from './components/custom-dropzone-preview/custom-dropzone-preview.component';
import { DragAndDropImageInputComponent } from './components/drag-and-drop-image-input/drag-and-drop-image-input.component';
import { UserProfileSettingsApiService } from './services/user-profile-settings-api.service';

const routes: Routes = [
	{
		path: '',
		component: ProfileSettingsComponent,
		data: { title: 'Edycja profilu' },
	},
];

@NgModule({
	declarations: [
		ProfileSettingsComponent,
		DragAndDropImageInputComponent,
		CustomDropzonePreviewComponent,
	],
	imports: [
		RouterModule.forChild(routes),
		CommonModule,
		RouterModule,
		ReactiveFormsModule,
		NgxDropzoneModule,
		SharedModule,
	],
	providers: [UserProfileSettingsApiService],
})
export class ProfileSettingsModule {}

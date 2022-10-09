import { Component, Input, OnInit } from '@angular/core';
import { NgxDropzonePreviewComponent } from 'ngx-dropzone';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'app-custom-dropzone-preview',
	templateUrl: './custom-dropzone-preview.component.html',
	styleUrls: ['./custom-dropzone-preview.component.scss'],
	providers: [
		{
			provide: NgxDropzonePreviewComponent,
			useExisting: CustomDropzonePreviewComponent,
		},
	],
})
export class CustomDropzonePreviewComponent
	extends NgxDropzonePreviewComponent
	implements OnInit
{
	@Input() isBanner = false;

	imageSrc: any;

	constructor(sanitizer: DomSanitizer) {
		super(sanitizer);
	}

	ngOnInit() {
		this.loadFile();
	}

	loadFile() {
		const reader = new FileReader();

		reader.onload = (event: any) => {
			this.imageSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
				event.target.result
			);
		};

		reader.onerror = (event: any) => {
			console.log(`File could not be read: ${event.target.error.code}`);
		};

		reader.readAsDataURL(this.file);
	}
}

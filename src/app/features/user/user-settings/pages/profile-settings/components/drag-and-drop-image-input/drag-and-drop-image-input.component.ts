import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserProfileSettingsApiService } from '../../services/user-profile-settings-api.service';

@Component({
	selector: 'app-drag-and-drop-image-input',
	templateUrl: './drag-and-drop-image-input.component.html',
	styleUrls: ['./drag-and-drop-image-input.component.scss'],
})
export class DragAndDropImageInputComponent implements OnInit {
	@Input() backgroundImage: string | null = null;
	@Input() initImageSrc: string | undefined | null = null;
	@Input() isBanner = false;
	@Output() image = new EventEmitter<File | null>();

	files: File[] = [];
	isImageLoaded = false;
	readonly _maxFileSizeMB: number = 10 * 1024 * 1024;
	readonly _allowedImageType =
		'image/png,image/jpg,image/jpeg,image/svg,image/svg+xml';

	constructor(
		private readonly _toastrService: ToastrService,
		private readonly _userProfileSettingApiService: UserProfileSettingsApiService
	) {}

	ngOnInit(): void {
		if (this.backgroundImage) {
			this.backgroundImage = `./../../../../../assets/images/${this.backgroundImage}`;
		}

		if (this.initImageSrc) {
			this.getImageFromService(this.initImageSrc);
		} else {
			this.isImageLoaded = true;
		}
	}

	onSelect(event: any) {
		if (event.addedFiles.length > 0) {
			this.files = [];
			this.files.push(...event.addedFiles);
			this.image.emit(...event.addedFiles);
		} else {
			const isUnderRequiredSize =
				event.rejectedFiles[0].size > this._maxFileSizeMB;
			this._toastrService.error(
				isUnderRequiredSize ? 'Zbyt duży rozmiar pliku' : 'Niedozwolony plik',
				'Błąd'
			);
		}
	}

	onRemove(event: File) {
		this.files.splice(this.files.indexOf(event), 1);
		this.image.emit(null);
	}

	getImageFromService(imageUrl: string) {
		this._userProfileSettingApiService.getImage(imageUrl).subscribe({
			next: (data) => {
				const imageFile = new File([data.body as BlobPart], '', {
					type: data.body?.type,
				});
				this.files.push(imageFile);
				this.isImageLoaded = true;
			},
			error: () => {
				const errorMsg = this.isBanner ? 'tła profilu' : 'avatara';
				this._toastrService.error(`Błąd podczas ładowania ${errorMsg}`, 'Błąd');
				this.isImageLoaded = true;
			},
		});
	}
}

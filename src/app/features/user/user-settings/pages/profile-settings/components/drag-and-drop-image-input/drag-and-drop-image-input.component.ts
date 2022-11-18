import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

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

	constructor(private readonly _toastrService: ToastrService) {}

	ngOnInit(): void {
		if (this.backgroundImage) {
			this.backgroundImage = `./../../../../../assets/images/${this.backgroundImage}`;
		}

		if (this.initImageSrc) {
			this.getImageFromUrl(this.initImageSrc).then((result) => {
				if (result) {
					const fileData = this.getBase64AndTypeFromImage(result as string);
					const imageName = `avatar.${fileData.imageType}`;
					try {
						const imageBlob = this.base64ToBlob(fileData.base64, fileData.type);
						const imageFile = new File([imageBlob], imageName, {
							type: fileData.type,
						});
						this.files.push(imageFile);
					} catch {
						const errorMsg = this.isBanner ? 'tła profilu' : 'avatara';
						this._toastrService.error(
							`Błąd podczas ładowania ${errorMsg}`,
							'Błąd'
						);
					} finally {
						this.isImageLoaded = true;
					}
				}
			});
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
			let errorMessage;
			if (event.rejectedFiles[0].size > this._maxFileSizeMB)
				errorMessage = 'Zbyt duży rozmiar pliku';
			else errorMessage = 'Niedozwolony plik';
			this._toastrService.error(errorMessage, 'Błąd');
		}
	}

	onRemove(event: File) {
		this.files.splice(this.files.indexOf(event), 1);
		this.image.emit(null);
	}

	async getImageFromUrl(imageUrl: any) {
		const res = await fetch(imageUrl);
		const blob = await res.blob();

		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.addEventListener(
				'load',
				function () {
					resolve(reader.result);
				},
				false
			);

			reader.onerror = () => {
				return reject(this);
			};
			reader.readAsDataURL(blob);
		});
	}

	getBase64AndTypeFromImage(content: string) {
		const data = content.split(';');
		const type = data[0].split(':')[1];
		const base64 = data[1].split(',')[1];
		return {
			type: type,
			base64: base64,
			imageType: type.split('/')[1],
		};
	}

	base64ToBlob(base64: string, imageType: string): any {
		const byteString = window.atob(base64);
		const arrayBuffer = new ArrayBuffer(byteString.length);

		const int8Array = new Uint8Array(arrayBuffer);

		for (let i = 0; i < byteString.length; i++) {
			int8Array[i] = byteString.charCodeAt(i);
		}
		const blob = new Blob([int8Array], { type: imageType });
		return blob;
	}
}

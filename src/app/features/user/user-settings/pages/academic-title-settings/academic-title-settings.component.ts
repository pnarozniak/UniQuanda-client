import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { LoaderService } from 'src/app/core/services/loader.service';
import { UserDataService } from 'src/app/core/services/user-data.service';
import { IAcademicTitleOfUser } from './models/academic-title-of-user.dto';
import { IAcademicTitle } from './models/academic-title.dto';
import { ITitleRequest } from './models/title-request.dto';
import { AcademicTitleApiService } from './services/academic-title.api.service';

@Component({
	selector: 'app-academic-title-settings',
	templateUrl: './academic-title-settings.component.html',
	styleUrls: ['./academic-title-settings.component.scss'],
})
export class AcademicSettingsComponent implements OnInit {
	constructor(
		private readonly _academicTitleApiService: AcademicTitleApiService,
		private readonly _userDataService: UserDataService,
		private readonly _toastrService: ToastrService,
		private readonly _loader: LoaderService
	) {}

	public isRequestsLoaded = false;
	public showShowFormButton = false;

	ngOnInit(): void {
		this.userId = this._userDataService.getUserData()?.id ?? 0;
		this._academicTitleApiService
			.getAcademicOfUserTitles(this.userId)
			.subscribe((titles) => {
				this.userTitles$.next(titles);
			});

		this._academicTitleApiService
			.getRequestableAcademicTitles()
			.subscribe((titles) => {
				this.avilableTitles$.next(titles);
			});

		this._academicTitleApiService
			.getAcademicTitleRequests()
			.subscribe((requests) => {
				this.isRequestsLoaded = true;
				if (requests.length > 0) {
					this.showShowFormButton = true;
				}
				this.requests$.next(requests);
			});
	}

	private userId!: number;
	public userTitles$ = new BehaviorSubject<IAcademicTitleOfUser[]>([]);
	public avilableTitles$ = new BehaviorSubject<IAcademicTitle[]>([]);
	public requests$ = new BehaviorSubject<ITitleRequest[]>([]);

	handleShowFormClick(): void {
		this.showShowFormButton = false;
	}

	handleFormSubmit(data: FormData) {
		this._loader.show();
		this._academicTitleApiService
			.addRequestForTitle(data)
			.subscribe((response) => {
				if (response) {
					this._toastrService.success('Prośba wysłana', 'Sukces');
					this._academicTitleApiService
						.getAcademicTitleRequests()
						.subscribe((requests) => {
							this._loader.hide();
							this.requests$.next(requests);
						});
				} else {
					this._toastrService.error('Spróbuj ponownie później', 'Błąd');
				}
			});
	}
}

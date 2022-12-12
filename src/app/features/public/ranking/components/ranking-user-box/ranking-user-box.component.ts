import { Component, Input, OnInit } from '@angular/core';
import { Role } from 'src/app/core/enums/role.enum';
import { UserDataService } from 'src/app/core/services/user-data.service';
import { AcademicTitleType } from 'src/app/shared/enums/academic-title-type';
import { IGetRankingResponseDTOUser } from '../../models/get-ranking.model';

@Component({
	selector: 'app-ranking-user-box',
	templateUrl: './ranking-user-box.component.html',
	styleUrls: ['./ranking-user-box.component.scss'],
})
export class RankingUserBoxComponent implements OnInit {
	constructor(private readonly _userDataService: UserDataService) {}
	ngOnInit(): void {
		this.isPremium =
			this._userDataService.getUserData()?.roles.includes(Role.PREMIUM) ??
			false;
	}

	@Input() public user!: IGetRankingResponseDTOUser;
	public isImageLoading = true;
	public isPremium = false;

	getAcademicTitleTypeColor(type: AcademicTitleType) {
		switch (type) {
			case AcademicTitleType.Engineer:
				return '#1AA39D';
			case AcademicTitleType.Bachelor:
				return '#262B90';
			case AcademicTitleType.Academic:
				return '#FE4D10';
			default:
				return '#000000';
		}
	}

	public generatePointsText(points: number): string {
		if (points === 0) return 'Brak punktów';
		if (points === 1) {
			return `${points} punkt`;
		} else if (points % 100 >= 12 && points % 100 <= 14) {
			return `${points} punktów`;
		} else if (points % 10 > 1 && points % 10 < 5) {
			return `${points} punkty`;
		}
		return `${points} punktów`;
	}

	public generateMessageText(): string {
		return this.isPremium
			? `Napisz do użytkownika.
			Dostępne w wersji 2.0`
			: `By napisać do użytkownika, musisz posiadać konto premium.
			Dostępne w wersji 2.0`;
	}
}

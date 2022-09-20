import AcademicTitle from './acedemic-title';
import HeaderStatistics from './header-statistics';
import University from './university';
import UserData from './user-data';

export class UserProfileResponseDTO {
	public userData: UserData;
	public academicTitles: AcademicTitle[];
	public universities: University[];
	public headerStatistics: HeaderStatistics;
	constructor(data: UserProfileResponseDTO) {
		this.userData = data.userData;
		this.academicTitles = data.academicTitles;
		this.headerStatistics = data.headerStatistics;
		this.universities = data.universities;
	}
}

import { IAcademicTitle } from './acedemic-title';
import { IHeaderStatistics } from './header-statistics';
import { IUniversity } from './university';
import { IUserData } from './user-data';

export interface IUserProfileResponseDTO {
	userData: IUserData;
	academicTitles: IAcademicTitle[];
	universities: IUniversity[];
	headerStatistics: IHeaderStatistics;
}

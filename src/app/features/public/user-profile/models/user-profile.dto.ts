import { IAcademicTitle } from '../../../../shared/models/academic-title.model';
import { IHeaderStatistics } from './header-statistics';
import { IPointsInTag } from './points-in-tag';
import { IUniversity } from './university';
import { IUserData } from './user-data';

export interface IUserProfileResponseDTO {
	userData: IUserData;
	academicTitles: IAcademicTitle[];
	universities: IUniversity[];
	headerStatistics: IHeaderStatistics;
	pointsInTags: IPointsInTag[];
}

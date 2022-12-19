import { AcademicTitleType } from 'src/app/shared/enums/academic-title-type';

export interface IAcademicTitleOfUser {
	titleId: number;
	type: AcademicTitleType;
	name: string;
	order: number;
}

import { AcademicTitleType } from 'src/app/shared/enums/academic-title-type';

export interface IAcademicTitle {
	name: string;
	academicTitleType: AcademicTitleType;
	order: number;
}

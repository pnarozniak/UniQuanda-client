import { AcademicTitleType } from 'src/app/shared/enums/academic-title-type';

export interface IAcademicTitle {
	titleId: number;
	name: string;
	type: AcademicTitleType;
}

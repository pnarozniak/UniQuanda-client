import { AcademicTitleType } from 'src/app/shared/enums/academic-title-type.enum';

export interface IAcademicTitle {
	id: number;
	name: string;
	academicTitleType: AcademicTitleType;
	order: number;
}

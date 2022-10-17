export interface IAcademicTitle {
	name: string;
	academicTitleType: AcademicTitleType;
	order: number;
}

export enum AcademicTitleType {
	Bachelor = 0,
	Engineer = 1,
	Academic = 2,
}

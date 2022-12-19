import { IAcademicTitle } from 'src/app/shared/models/academic-title.model';

export interface IAuthorContent {
	id: number;
	nickname: string;
	avatarUrl: string | null;
	academicTitles: IAcademicTitle[];
}

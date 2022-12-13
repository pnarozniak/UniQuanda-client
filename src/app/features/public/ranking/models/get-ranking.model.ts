import { AcademicTitleType } from 'src/app/shared/enums/academic-title-type';

export class GetRankingRequestDTO {
	constructor(
		public readonly page: number,
		public readonly addCount: boolean,
		public readonly tagId: number | null
	) {}
}
export interface IGetRankingResponseDTO {
	rankingPage: IGetRankingResponseDTOUser[];
	pagesCount: number;
}

export interface IGetRankingResponseDTOUser {
	id: number;
	nickname: string;
	avatar: string | null;
	points: number;
	place: number;
	titles: IGetRankingResponseDTOAcademicTitle[];
}

export interface IGetRankingResponseDTOAcademicTitle {
	name: string;
	order: number;
	academicTitleType: AcademicTitleType;
}

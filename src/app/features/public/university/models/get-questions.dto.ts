export class GetQuestionsRequestDto {
	constructor(
		public readonly universityId: number,
		public readonly page: number,
		public readonly pageSize: number,
		public readonly addCount: boolean
	) {}
}

export interface IGetQuestionsResponseDto {
	questions: IGetQuestionsResponseDtoQuestion[];
	totalCount: number | null;
}

export interface IGetQuestionsResponseDtoQuestion {
	id: number;
	header: string;
	html: string;
	views: number;
	answersCount: number;
	creationDate: Date;
	isPopular: boolean;
	hasCorrectAnswer: boolean;
	tagNames: string[];
	user: IGetQuestionsResponseDtoUser;
}

export interface IGetQuestionsResponseDtoUser {
	id: number;
	name: string;
	profilePictureURL: string | null;
}

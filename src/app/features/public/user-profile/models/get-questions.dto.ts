export class GetQuestionsRequestDTO {
	constructor(
		public userId: number,
		public page: number,
		public pageSize: number,
		public addCount: boolean
	) {}
}
export interface IGetQuestionsResponseDTO {
	questions: IGetQuestionsResponseDTOQuestion[];
	totalCount?: number;
}
export interface IGetQuestionsResponseDTOQuestion {
	id: number;
	header: string;
	html: string;
	views: number;
	answers: number;
	createdAt: string;
	hasCorrectAnswer: boolean;
	tagNames: string[];
}
